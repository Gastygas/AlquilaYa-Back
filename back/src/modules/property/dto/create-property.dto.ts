import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsArray, IsUrl, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    example:["https://www.atelierlima.com/wp-content/uploads/2023/02/ralph-ravi-kayden-mR1CIDduGLc-unsplash.jpg"]
  })
  @IsString({ each: true })
  photos: string[] | string;

  @IsArray()
  @IsOptional()
  disableDays?: Date[];

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

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    example:'https://www.google.com.ar/maps/place/Club+La+Quebrada/@-34.6525393,-58.7488098,2540m/data=!3m1!1e3!4m6!3m5!1s0x95bc9596ac618033:0x789c737f3b1680fb!8m2!3d-34.6528512!4d-58.7499816!16s%2Fg%2F11j8rdfz8c?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D'
  })
  addressUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'Electricity bill'
  })
  bill: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:'Brasil'
  })
  country: string;

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
  @IsNotEmpty()
  @ApiProperty({
    example: false
  })
  wifi: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example:true
  })
  petFriendly: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example:true
  })
  airConditioning: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example:true
  })
  heating: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example:true
  })
  pool: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example:true
  })
  parking: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:"Here you can sleep pacefully"
  })
  description?: string;

  @IsString()
  @ApiProperty({
    example:"For sell"
  })
  propertyStatus: string;
}