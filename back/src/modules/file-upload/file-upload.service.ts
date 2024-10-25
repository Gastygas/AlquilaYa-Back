import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRespository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRespository,
    ){}

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const response = await this.fileUploadRepository.uploadImage(file);
        if (!response.secure_url) {
          throw new NotFoundException('Error uploading image to Cloudinary');
        }
        return response.secure_url;  
      }
}
