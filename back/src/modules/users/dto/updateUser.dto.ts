import { PickType } from '@nestjs/swagger';
import { SignUpDto } from 'src/modules/auth/dto/signUp.dto';

export class UpdateUserDto extends PickType(SignUpDto, [
  'address',
  'country',
  'phone',
  'name',
  'surname',
  'dni',
]) {}
