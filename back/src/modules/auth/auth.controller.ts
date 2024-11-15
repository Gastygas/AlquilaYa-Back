import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserLowerCaseInterceptor } from 'src/interceptors/data-user-lower-case';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UsersRepository } from '../users/users.repository';
import { changePasswordDto } from './dto/changePassword.dto';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
  ) {}

  @Post('signup')
  @UseInterceptors(UserLowerCaseInterceptor)
  async signUp(@Body() newUser: SignUpDto) {
    return await this.authService.SignUp(newUser);
  }

  @Post('signin')
  @UseInterceptors(UserLowerCaseInterceptor)
  async signIn(@Body() credentialsUser: SignInDto) {
    return await this.authService.SignIn(credentialsUser);
  }

  @Get('forgot/password/:email')
  async forgotPassword(@Param('email') email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Post('change/password')
  async changePassword(@Body() credentials: changePasswordDto) {
    return await this.authService.changeUserPassword(credentials);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Post('seeder')
  addUsersController() {
    return this.authService.addUsersService();
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Get('googleLogin')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request, @Res() res: Response): Promise<void> {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response): Promise<void> {
    const { createdUser } = await this.authService.googleLogin(req.user);
    const user = await this.userRepository.getUserByEmail(createdUser.email);
    const jwt = await this.authService.createJwtToken(user);
    const URL_FRONT = process.env.FRONT_URL;
    let redirectUrl: string = URL_FRONT + '/completa-tu-informacion';
    if (
      user.name &&
      user.surname &&
      user.address &&
      user.country &&
      user.dni &&
      user.phone
    )
      redirectUrl = URL_FRONT;

    console.log('En auth controller jwt: ', jwt);
    console.log('redirectUrl: ', redirectUrl);

    //res.status(HttpStatus.OK).redirect(`http://localhost:3000/`);

    // res
    //   .cookie('auth_token', jwt, {
    //     httpOnly: false, // Evita el acceso desde JavaScript
    //     secure: false, //process.env.NODE_ENV === 'production', // Solo permite HTTPS en producción
    //     sameSite: 'lax', // 'none', 'strict', // Mejora la protección CSRF
    //   })
    //   .redirect(redirectUrl);

    res.redirect(redirectUrl + `?auth_token=${jwt}`);

    /*.status(HttpStatus.OK)
      .redirect(`http://localhost:3001/auth/google?token=${jwt}`);*/
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
}
