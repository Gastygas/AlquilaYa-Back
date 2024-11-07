import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsUrl, IsOptional, IsNumber, IsNotEmpty, IsEmpty, IsInt } from 'class-validator';

export class CreatePropertyDto {
  
  @IsEmpty()
  photos: string[] | string;

  @ApiProperty({ example: ["24/10/12"]})
  @IsArray()
  @IsOptional()
  disableDays?: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'Best Mansion ever'
  })
  propertyName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'043 Fake st'
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'house'
  })
  type: string;

  @IsOptional()
  @ApiProperty({
    example:'https://www.google.com.ar/maps/place/Club+La+Quebrada/@-34.6525393,-58.7488098,2540m/data=!3m1!1e3!4m6!3m5!1s0x95bc9596ac618033:0x789c737f3b1680fb!8m2!3d-34.6528512!4d-58.7499816!16s%2Fg%2F11j8rdfz8c?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D'
  })
  addressUrl?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'Brasil'
  })

  country: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example:'https://prismic-io.s3.amazonaws.com/palmettoblog/172693e9-a059-46db-a600-0bc9b0a43bda_base-charge.png'
  })
  bill: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'Brasilia'
  })
  city: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:10000
  })
  price: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:15
  })
  capacity: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:8
  })
  bedrooms: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example:1
  })
  bathrooms: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false
  })
  wifi: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  petFriendly: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  airConditioning: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  heating: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  pool: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example:true
  })
  parking: boolean;

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
  streaming?:boolean;

  @IsOptional()
  @ApiProperty({
    example:false
  })
  yard?:boolean;

  @IsOptional()
  @ApiProperty({
    example:true
  })
  grill?:boolean;

  @IsOptional()
  @ApiProperty({
    example:true
  })
  gym?:boolean;

  @IsOptional()
  @ApiProperty({
    example:true
  })
  appliance?:boolean

  @IsOptional()
  @ApiProperty({
    example:false
  })
  cleaningService?: boolean

  @IsOptional()
  @ApiProperty({
    example:false
  })
  catering?:boolean
}