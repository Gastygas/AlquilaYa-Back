import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePropertyDto } from './create-property.dto'; // Importa el DTO original

export class CreatePropertyWithImageDto extends CreatePropertyDto {
  
    @ApiPropertyOptional({
    description: 'Image file to upload',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any; // Solo para Swagger, no se usará en lógica real
}