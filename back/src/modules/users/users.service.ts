import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  addUsersService() {
    this.usersRepository.addUsersRepository();
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  getUsers() {
    return this.usersRepository.getUsers;
  }
}
