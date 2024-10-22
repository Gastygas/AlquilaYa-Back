import { IsString, IsInt, IsBoolean, IsArray, IsUrl, IsOptional, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsArray()
  @IsString({ each: true })
  photos: string[] | string;

  @IsArray()
  @IsOptional()
  disableDays?: Date[];

  @IsString()
  propertyName: string;

  @IsString()
  address: string;

  @IsUrl()
  addressUrl: string;

  @IsString()
  bill: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsInt()
  price: number;

  @IsInt()
  capacity: number;

  @IsInt()
  bedrooms: number;

  @IsInt()
  bathrooms: number;

  @IsBoolean()
  wifi: boolean;

  @IsBoolean()
  petFriendly: boolean;

  @IsBoolean()
  airConditioning: boolean;

  @IsBoolean()
  heating: boolean;

  @IsBoolean()
  pool: boolean;

  @IsBoolean()
  parking: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  propertyStatus: string;
}