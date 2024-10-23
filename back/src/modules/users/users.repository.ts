import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as dataUsers from '../../utils/dataUsers.json';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async createUser(user: Partial<User>) {
    //console.log('user: ', user);
    try {
      const newUser = await this.usersRepository.save(user);
      console.log('newUser: ', newUser);
      const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
      const { password, ...userSinPassword } = dbUser;
      return userSinPassword;
    } catch (err) {
      throw new Error('Error al crear el usuario');
    }
  }

  async create (user: Partial<User>) {
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
      const user = await this.usersRepository.findOneBy({ email });
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
      relations:{
        properties:true,
        bookings:true,
      }
    });
    return users.map(({ password, ...userSinPassword }) => userSinPassword);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  
  async getUserById(id: string):Promise<Omit<User,'password'>> {
    const user = await this.usersRepository.findOne({where:{id}})
    if(!user) throw new BadRequestException('user not found')
    const {password,...userWithOutPassword} = user
    return userWithOutPassword
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  // addUsersRepository() {
  //   const users;
  //   dataUsers.forEach((user) => )

  // }
}
