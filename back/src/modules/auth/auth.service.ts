import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";

const users = [
    {
        name:'gaston',
        email:"gaston@gmail.com"
    },{}
]

@Injectable()
export class AuthService{

    async SignUp(createUser: SignUpDto){
        const userExists = users.filter((user) => user.email = createUser.email)
        if(userExists) throw new BadRequestException('Email Already Used');

        if(createUser.password !== createUser.confirmPassword) throw new BadRequestException('Confirm Password is not the same')

        
    }

    async SignIn(userCredentials: SignInDto){

    }
};