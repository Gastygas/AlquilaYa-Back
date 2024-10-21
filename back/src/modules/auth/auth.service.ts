import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { default as dataUsers } from '../../utils/dataUsers.json';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async SignUp(newUser: SignUpDto): Promise<Object> {
    
    const userDb = await this.usersRepository.getUserByEmail(newUser.email);
    if (userDb) throw new BadRequestException('Email Already Used');

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    if (!hashedPassword)
      throw new BadRequestException('Password could not be created');

    const newUserBD:Partial<User> = await this.usersRepository.createUser({
      ...newUser,
      password: hashedPassword,
    });
    return { succes: 'User registered!' };
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async SignIn(userCredentials: SignInDto): Promise<Object> {
    const userDb = await this.usersRepository.getUserByEmail(
      userCredentials.email,
    );

    if (!userDb) throw new BadRequestException('Email or Password Incorrect');

    const isPasswordValid = await bcrypt.compare(
      userCredentials.password,
      userDb.password,
    );
    if (!isPasswordValid)
      throw new BadRequestException('Email or Password Incorrect');

    const userPayload = {
      id: userDb.id,
      email: userDb.email,
      isAdmin: userDb.isAdmin,
    };
    const token = await this.jwtService.sign(userPayload);
    const {password,...userWithOutPassword} = userDb
    return {
      succes: 'User has been logged in succesfully',
      user: userWithOutPassword,
      token: token,
    };
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  addUsersService() {
    //console.log('dataUsers: ', dataUsers);
    dataUsers.forEach((user) => this.SignUp(user));
    return 'Usuarios agregados';
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
}
