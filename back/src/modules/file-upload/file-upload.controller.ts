import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('file-upload')
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Upload a file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
    description: 'File to upload',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
    async uploadImage(@Param('id') propertyId: string, @UploadedFile(new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo supera el peso maximo de  200kb'
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)$/,
          }),
        ],
      }),
    ) file: Express.Multer.File){
      return this.fileUploadService.uploadImage(file, propertyId);
      
    }
}
