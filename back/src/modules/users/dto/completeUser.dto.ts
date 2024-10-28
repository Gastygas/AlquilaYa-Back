import { IsString, IsInt, IsBoolean, IsArray, IsUrl, IsOptional, IsNumber, IsNotEmpty, IsStrongPassword } from 'class-validator';
export class  completeUserDto  {
    @IsNotEmpty()
    @IsString()
    surname : string

    @IsNotEmpty()
    @IsString()
    address : string

    @IsNotEmpty()
    @IsString()
    country : string

    @IsNotEmpty()
    @IsString()
    dni : string

    @IsNotEmpty()
    @IsString()
    phone : string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password : string
}