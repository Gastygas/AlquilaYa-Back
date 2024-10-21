import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAllUsersService() {
    return this.usersRepository.getAllUsers();
  }
}
