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
import { EmailService } from '../email/email.service';
import { changePasswordDto } from './dto/changePassword.dto';
import { Role } from '../users/enum/user.roles.enum';
import { count } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

    const newUserDb: Partial<User> = await this.usersRepository.createUser({
      ...newUser,
      password: hashedPassword,
    });
    await this.emailService.sendEmailRegisterSuccessfully(newUserDb.email,newUserDb.name)
    return {
      succes: 'User registered!, Please check your email',
      user: newUserDb,
    };
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  async SignIn(userCredentials: SignInDto): Promise<Object> {
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

  addUsersService() {
    //console.log('dataUsers: ', dataUsers);
    dataUsers.forEach((user) => this.SignUp(user));
    return 'Usuarios agregados';
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('email does not exits');
    await this.emailService.sendEmailForgotPassword(email);
    return { success: 'Please verify if this user is yours in your email' };
  }

  async changeUserPassword(credentials: changePasswordDto) {
    const user = await this.usersRepository.getUserByEmail(credentials.email);
    if (!user) throw new BadRequestException('email does not exits');
    const newPassword = await bcrypt.hash(credentials.password, 10);
    if (!newPassword) throw new BadRequestException('Error in create password');
    user.password = newPassword;
    await this.userEntity.save(user);
    return { success: 'your have changed your password successfully' };
  }

  //-----------------------------------------------------------------------------------------
  //------------------Auth0------------------------------------------------------------------

  async googleLogin(data: any): Promise<{ createdUser: User; isNew: boolean }> {
    return runWithTryCatchBadRequest(async () => {
      const user: User = await this.usersRepository.getUserByEmail(data.email);
      if (!user) {
        const name = data.firstName;
        const email = data.email;
        const newUser = {
          name: name || '',
          email: email,
          surname: data.LastName,
          password: '',
          address: '',
          phone: '',
          isAdmin: false,
          image: data.picture,
          dni: '',
          country: '',
        };
        const createdUser: User = await this.usersRepository.create(newUser);
        await this.emailService.sendEmailRegisterSuccessfully(newUser.email,newUser.name)
        return { createdUser, isNew: true };
      } else {
        return { createdUser: user, isNew: false };
      }
    });
  }

  async createJwtToken(user: User): Promise<string> {
    const payload: any = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      address: user.address,
      country: user.country,
      dni: user.dni,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
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
