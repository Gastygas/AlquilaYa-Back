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
  @ApiProperty({ example: 'eaa0db31-08f5-45f0-aa49-6badcbef7468' })
  propertyId: string;
}
