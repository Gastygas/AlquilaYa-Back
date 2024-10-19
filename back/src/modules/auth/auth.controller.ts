import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller("auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}

    @Post("signup")
    async SignUp(@Body() createUser: SignUpDto){
        // createUser.email.toLowerCase() // crear un interceptor
        return await this.authService.SignUp(createUser)
    }

    @Post("signin")
    async SignIn(@Body() userCredentials: SignInDto){
        // userCredentials.email.toLowerCase() // crear un interceptor
        return await this.authService.SignIn(userCredentials)
    }

};