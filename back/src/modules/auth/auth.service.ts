import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { default as bcrypt } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { default as dataUsers } from '../../utils/dataUsers.json';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
  ) {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async SignUp(newUser: SignUpDto): Promise<Object> {
    const userDb = await this.usersRepository.getUserByEmail(newUser.email);
    if (userDb) throw new BadRequestException('Email Already Used');

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    if (!hashedPassword)
      throw new BadRequestException('Password could not be created');

    const newUserBD: Partial<User> = await this.usersRepository.createUser({
      ...newUser,
      password: hashedPassword,
    });
    return { succes: 'User registered!' };
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async SignIn(userCredentials: SignInDto): Promise<Object> {
    // const userEmail = await this.usersRepository.getUserByEmail(
    //   userCredentials.email,
    // );
    // if (!userEmail) throw new BadRequestException('Email or Password Incorrect');

    const userDb = await this.userEntity.findOne({
      where: { email: userCredentials.email },
      select: ['id', 'email', 'password', 'isAdmin'],
    });

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
    const { password, ...userWithOutPassword } = userDb;
    return {
      succes: 'User has been logged in succesfully',
      user: userWithOutPassword,
      token: token,
    };
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async googleLogin(data: any): Promise<{ createdUser: User; isNew: boolean }> {
    return runWithTryCatchBadRequest(async () => {
      const user: User = await this.usersRepository.getUserByEmail(data.email);
      if (!user) {
        const name = data.firstName + ' ' + data.LastName;
        const email = data.email;
        const newUser = {
          name: name || '',
          email: email,
          password: '',
          address: '',
          phone: '',
          isAdmin: false,
          image: data.picture,
          dni: '',
          country: '',

        };
        const createdUser: User = await this.usersRepository.create(newUser);
        return { createdUser, isNew: true };
      } else {
        return { createdUser: user, isNew: false };
      }
    });
  }

  addUsersService() {
    //console.log('dataUsers: ', dataUsers);
    dataUsers.forEach((user) => this.SignUp(user));
    return 'Usuarios agregados';
  }

  async createJwtToken(user: any): Promise<string> {
    const payload: any = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }
}


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

async function runWithTryCatchBadRequest<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error;
    } else {
      throw new InternalServerErrorException(error);
    }
  }
}

