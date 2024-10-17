import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength} from 'class-validator'
export class SignUpDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    surname:string;

    @IsNotEmpty()
    @IsNumber()
    @MaxLength(9)
    dni:string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    phone:string

    @IsNotEmpty()
    @IsString()
    country:string

    @IsNotEmpty()
    @IsString()
    adress:string

    @IsEmpty()
    isAdmin: boolean

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password:string

    @IsNotEmpty()
    confirmPassword:string
}