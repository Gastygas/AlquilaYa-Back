import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor() {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  addUsersRepository() {
    const uniqueUsers = new Set<User>();
    throw new Error('Method not implemented.');
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async getUsers() {
    return await [];
  }
}
