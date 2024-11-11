import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsUrl, IsOptional, IsNumber, IsNotEmpty, IsEmpty, IsInt } from 'class-validator';

export class CreatePropertyDto {
  
  @IsEmpty()
  photos: string[] | string;

  @ApiProperty({ example: ["24/10/12"]})
  @IsArray()
  @IsOptional()
  disableDays?:string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'Best Mansion ever'
  })
  propertyName:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'043 Fake st'
  })
  address:string;

  @IsOptional()
  @ApiProperty({
    example:'3'
  })
  floor:string;

  
  @IsOptional()
  @ApiProperty({
    example:'b'
  })
  room:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'house'
  })
  type:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'-34.6037'
  })
  lat: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'-58.3816'
  })
  lng: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'argentina'
  })
  country:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'buenos aires'
  })
  province:string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:'https://prismic-io.s3.amazonaws.com/palmettoblog/172693e9-a059-46db-a600-0bc9b0a43bda_base-charge.png'
  })
  bill:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'mar del plata'
  })
  city:string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:10000
  })
  price:number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:15
  })
  capacity:number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:8
  })
  bedrooms:number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:1
  })
  bathrooms:number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false
  })
  wifi:boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  petFriendly:boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  airConditioning:boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  heating:boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  pool:boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  parking:boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:"Here you can sleep pacefully"
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    example:true
  })
  streaming:boolean;

  @IsOptional()
  @ApiProperty({
    example:false
  })
  yard:boolean;

  @IsOptional()
  @ApiProperty({
    example:true
  })
  grill:boolean;

  @IsOptional()
  @ApiProperty({
    example:true
  })
  gym:boolean;

  @IsOptional()
  @ApiProperty({
    example:true
  })
  appliance:boolean

  @IsOptional()
  @ApiProperty({
    example:false
  })
  cleaningService: boolean

  @IsOptional()
  @ApiProperty({
    example:false
  })
  catering:boolean
}