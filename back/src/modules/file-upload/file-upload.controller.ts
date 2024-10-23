import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from '../property/dto/create-property.dto';

@ApiTags('file-upload')
@Controller('files')
export class FileUploadController {
    propertyService: any;
    constructor(private readonly fileUploadService: FileUploadService){}

@Post()
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'Property data and optional image to upload',
  schema: {
    type: 'object',
    properties: {
      address: { type: 'string' }, 
      file: { type: 'string', format: 'binary' },
    },
  },
})
createPropertyController(
  @Body() newProperty: CreatePropertyDto,
  @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 200000 }),
      new FileTypeValidator({ fileType: /(.jpg|.jpeg|.png|.webp)$/ }),
    ],
  })) file?: Express.Multer.File,
) {
  return this.propertyService.createProperty(newProperty, file);
}
}
