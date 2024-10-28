import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';
import { completeUserDto } from './dto/completeUser.dto';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsersService() {
    return this.usersRepository.getAllUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  async completeUser(id : string , user: completeUserDto) {
    return  await this.usersRepository.completeUser(id , user);
  } 
}
