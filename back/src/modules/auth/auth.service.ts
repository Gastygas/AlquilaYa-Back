import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    async SignUp(newUser: SignUpDto):Promise<Object>{
        
        const userDb: User = await this.userRepository.findOne({where:{email: newUser.email}})
        if(userDb) throw new BadRequestException('Email Already Used');

        if(newUser.password !== newUser.confirmPassword) throw new BadRequestException('Confirm Password is not the same')

        const hashedPassword = await bcrypt.hash(newUser.password,10)
        if(!hashedPassword) throw new BadRequestException('Password could not be created')

        const {confirmPassword,...restUser} = newUser
        const newUserDb = await this.userRepository.create({...restUser,password:hashedPassword})
        await this.userRepository.save(newUserDb)
        
        return {succes: 'User registered!'}
    }

    async SignIn(userCredentials: SignInDto):Promise<Object>{
        const userDb:User = await this.userRepository.findOne({where: {email: userCredentials.email}})

        if(!userDb) throw new BadRequestException('Email or Password Incorrect')
        if(userDb.email !== userCredentials.email) throw new BadRequestException('Email or Password Incorrect')
        
        const isPasswordValid = await bcrypt.compare(userCredentials.password,userDb.password)
        if(!isPasswordValid) throw new BadRequestException('Email or Password Incorrect')

        const userPayload = {
            id: userDb.id,
            email: userDb.email,
            isAdmin: userDb.isAdmin
        }

        const token = await this.jwtService.sign(userPayload)
        return {succes: "User has been logged in succesfully", token }
    }
};