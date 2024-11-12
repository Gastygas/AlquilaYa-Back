import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity';
import { completeUserDto } from './dto/completeUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

   getAllUsersService() {
    return this.usersRepository.getAllUsers();
  }

   getUserById(id:string) {
    return this.usersRepository.getUserById(id);
  }
  getUserByEmailService(email: string) {
    return this.usersRepository.getUserByEmail(email)
  }

   completeUser(id:string , user: completeUserDto) {
    return this.usersRepository.completeUser(id , user);
  } 

   addFavoritePropertyService(propertyId:string,userId:string) {
    return this.usersRepository.addFavoritePropertyRepository(propertyId,userId)
  }
   disableUserService(id: string) {
    return this.usersRepository.disableUserRepository(id)
  }

  async updateUserService(updatedUser:UpdateUserDto,userId:string){
    return this.usersRepository.updateUserRepository(updatedUser,userId)
  }
}
