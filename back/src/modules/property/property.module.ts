import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { PropertyRepository } from './property.repository';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/entities/user.entity';
import { EmailService } from '../email/email.service';
import { FileUploadRespository } from '../file-upload/file-upload.repository';
import { FileUploadService } from '../file-upload/file-upload.service';


@Module({
  imports:[TypeOrmModule.forFeature([Property,User])],
  controllers: [PropertyController],
  providers: [PropertyService,PropertyRepository,UsersRepository,EmailService, FileUploadRespository, FileUploadService],

})
export class PropertyModule {}
