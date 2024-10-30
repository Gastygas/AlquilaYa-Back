import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PropertyService } from '../property/property.service';
import { ICustomRequest } from '../property/interface/customRequest';

@ApiTags('file-upload')
@Controller('files')
export class FileUploadController {
  constructor(
      private readonly fileUploadService: FileUploadService,
      private readonly propertyService: PropertyService,
    ){}

  @Post(":id")
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Property data and optional image to upload',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async uploadImageToProperty(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 200000 }),  
        new FileTypeValidator({ fileType: /(.jpg|.jpeg|.png|.webp)$/ }),
      ],
    })) file: Express.Multer.File
  ) {
    ;  
    return this.fileUploadService.uploadImageToProperty(id, file);
  }
}
