import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { default as bcrypt } from 'bcrypt';
import { completeUserDto } from './dto/completeUser.dto';
import { PropertyRepository } from '../property/property.repository';
import { Property } from 'src/entities/property.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    // private readonly propertyRepository: PropertyRepository,
  ) {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async createUser(user: Partial<User>) {
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    if (!dbUser) throw new BadRequestException('User could not be created');
    return dbUser;
  }

  async create(user: Partial<User>) {
    try {
      const newUser = await this.usersRepository.save(user);
      return newUser;
    } catch (err) {
      throw new Error('Error al crear el usuario');
    }
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { properties: true, bookings: true, reviews: true },
    });
    return user;
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async getAllUsers(page: number = 1, limit: number = 5) {
    const users = await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        properties: true,
        bookings: true,
        reviews: true,
      },
    });
    return users.map(({ password, ...userSinPassword }) => userSinPassword);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        properties: true,
        reviews: true,
        bookings: {
          property: true,
          payment: true,
        },
      },
    });
    if (!user) throw new BadRequestException('user not found');
    // const {password,...userWithOutPassword} = user
    return user;
  }

  async completeUser(id: string, user: completeUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const completedUser: completeUserDto = {
      surname: user.surname,
      address: user.address,
      phone: user.phone,
      country: user.country,
      dni: user.dni,
      password: hashedPassword,
    };

    await this.usersRepository.update(id, completedUser);

    console.log(await this.usersRepository.findOneBy({ id: id }));

    return 'user updated sucessfully';
  }

  async addFavoritePropertyRepository(propertyId: string, userId: string) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: { user: true, bookings: true },
    });
    if (!property) throw new BadRequestException('Property not found');

    const user = await this.getUserById(userId);

    const isUserProperty = user.properties.some(
      (prop) => prop.id === propertyId,
    );
    if (isUserProperty)
      throw new BadRequestException(
        'This is your property, you can not do this with yours',
      );

    const isAlreadyFavorite = user.favoriteProperties.some(
      (prop) => prop === propertyId,
    );
    if (isAlreadyFavorite)
      throw new BadRequestException('This property is in your favorites');

    user.favoriteProperties = [...user.favoriteProperties, propertyId];
    await this.usersRepository.save(user);

    return {
      success: 'You has added a new property in your Favorite Properties!',
    };
  }

  async disableUserRepository(id: string) {
    const user = await this.getUserById(id);
    user.status = false;
    await this.usersRepository.save(user);
    return { success: 'user has been disabled' };
  }

  async updateUserRepository(updatedUser: UpdateUserDto, userId: string) {
    const user = await this.getUserById(userId);
    const newUser = await this.usersRepository.update(userId, updatedUser);
    return {
      success: 'you have changed your data',
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      login: true,
    };
  }
}
