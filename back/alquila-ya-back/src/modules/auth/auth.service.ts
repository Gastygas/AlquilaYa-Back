import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import { IUser } from "./interface/IUserInterface";

const users:IUser[]= [
    {
        id:1,
        name:'gaston',
        email:"gaston@gmail.com",
        surname:'gonzalez',
        dni:45232333,
        phone:"+54936012934",
        isAdmin:false,
        password:'Strongpass123!',
        country:'Argentina',
        adress:'Hola 123'
    },
    {
        id:2,
        name:'gaston',
        email:"gaston2@gmail.com",
        surname:'gonzalez',
        dni:45232333,
        phone:"+54936012934",
        isAdmin:false,
        password:'Strongpass123!',
        country:'Argentina',
        adress:'Hola 123'
    },
    
    {
        id:3,
        name:'gaston',
        email:"gaston3@gmail.com",
        surname:'gonzalez',
        dni:45232333,
        phone:"+54936012934",
        isAdmin:false,
        password:'Strongpass123!',
        country:'Argentina',
        adress:'Hola 123'
    },
    
]
let id = users.length
@Injectable()
export class AuthService{

    async SignUp(createUser: SignUpDto){
        const userExists = users.filter((user) => user.email = createUser.email)
        if(userExists) throw new BadRequestException('Email Already Used');

        if(createUser.password !== createUser.confirmPassword) throw new BadRequestException('Confirm Password is not the same')

        const {confirmPassword,...restUser} = createUser
        id++
        await users.push({id,...restUser})
        
        return {succes: 'User registered!'}
    }

    async SignIn(userCredentials: SignInDto){

    }
};