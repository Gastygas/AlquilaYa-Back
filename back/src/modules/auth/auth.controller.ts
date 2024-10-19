import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('signup')
    async signUp(@Body() newUser: SignUpDto){
        return await this.authService.SignUp(newUser)
    }

    @Post('signin')
    async signIn(@Body() credentialsUser: SignInDto){
        return await this.authService.SignIn(credentialsUser)
    }
}