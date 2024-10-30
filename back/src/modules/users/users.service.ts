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

   getUserById(id:string) {
    return this.usersRepository.getUserById(id);
  }

   completeUser(id:string , user: completeUserDto) {
    return this.usersRepository.completeUser(id , user);
  } 

   addFavoritePropertyService(propertyId:string,userId:string) {
    return this.usersRepository.addFavoritePropertyRepository(propertyId,userId)
  }
}
