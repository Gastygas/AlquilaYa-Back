import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRespository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from 'src/entities/property.entity';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRespository,
      @InjectRepository(Property) private propertyEntity: Repository<Property>,
    ){}

    async uploadImageToProperty(propertyId: string, file: Express.Multer.File) {
      const uploadResult = await this.fileUploadRepository.uploadImage(file);
      const fileUrl = uploadResult.secure_url; 
      
      const property = await this.propertyEntity.findOne({where: {id: propertyId} });
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      if (!Array.isArray(property.photos)) {
        property.photos = [];  
      }  
      property.photos.push(fileUrl);  
      await this.propertyEntity.save(property);
      return {success:"image uploaded successfully!",
        property: property
      }
    }

    async uploadBilltoPropertyService(propertyId: string, file: Express.Multer.File) {
      const uploadResult = await this.fileUploadRepository.uploadImage(file);
      const fileUrl = uploadResult.secure_url; 
      const property = await this.propertyEntity.findOne({where: {id: propertyId} });
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      
      property.bill = fileUrl  
      await this.propertyEntity.save(property);
      return {success:"bill uploaded successfully!",
        property: property
      }
    }
}
