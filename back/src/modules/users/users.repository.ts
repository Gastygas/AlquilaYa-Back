import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as dataUsers from '../../utils/dataUsers.json';
import { EmailService } from '../email/email.service';
import { default as bcrypt } from 'bcrypt';
import { completeUserDto } from './dto/completeUser.dto';
@Injectable()
export class UsersRepository {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async createUser(user: Partial<User>) {
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    if (!dbUser) throw new BadRequestException('User could not be created');
    await this.emailService.sendEmailRegisterSuccessfully(
      dbUser.email,
      dbUser.name,
    );
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
    try {
      console.log('mail: ', email);
      const user = await this.usersRepository.findOne({ where: { email } });
      return user;
    } catch (err) {
      throw new Error('En getUserByEmail: ' + err.message);
    }
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

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  // addUsersRepository() {
  //   const users;
  //   dataUsers.forEach((user) => )

  // }
}
