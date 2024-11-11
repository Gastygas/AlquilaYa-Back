import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Muy confortable' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: 4 })
  stars: number;

  @ApiHideProperty()
  @IsEmpty()
  status?: boolean;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '1c7a816e-e205-45d8-89fb-a0f82ef875c7' })
  propertyId: string;
}
