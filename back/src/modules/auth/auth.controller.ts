import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserLowerCaseInterceptor } from 'src/interceptors/data-user-lower-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Post('seeder')
  addUsersController() {
    return this.authService.addUsersService();
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
}
