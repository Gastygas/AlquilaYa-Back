import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { Property } from 'src/entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from '../../config/cloudinary';
import { FileUploadRespository } from './file-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRespository],
})
export class FileUploadModule {}
