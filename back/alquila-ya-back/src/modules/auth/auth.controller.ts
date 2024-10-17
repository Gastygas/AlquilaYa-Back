import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}

    @Post("register")
    async SignUp(@Body() createUser: SignUpDto){
        createUser.email.toLowerCase()
        return await this.authService.SignUp(createUser)
    }

    @Post("login")
    async SignIn(@Body() userCredentials: SignInDto){
        return await this.authService.SignIn(userCredentials)
    }

};