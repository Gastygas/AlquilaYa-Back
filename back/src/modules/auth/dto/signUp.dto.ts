import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  surname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(9)
  dni: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  phone: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  adress: string;

  @IsEmpty()
  isAdmin: boolean;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Debe ser un correo electrónico válido',
    example: 'mailadmin@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({
    description: 'Debe ser una contraseña segura',
    example: 'Pas$1234',
  })
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;
}
