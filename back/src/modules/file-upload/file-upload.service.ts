import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRespository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../../entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRespository,
        @InjectRepository(Property) private readonly propertyRepository: Repository<Property>,
    ){}

    async uploadImage(file: Express.Multer.File, propertyId: string){
       const property = await this.propertyRepository.findOneBy({
        id: propertyId
       });
       if (!property) {
            throw new NotFoundException('Property not found');
       }

       const response = await this.fileUploadRepository.uploadImage(file);
       if (!response.secure_url) {
            throw new NotFoundException('Error uploading image to Cloudinary');
       }
    
       const updatedPhotos = [...(property.photos || []), response.secure_url];

    await this.propertyRepository.update(propertyId, {
        photos: updatedPhotos,
    });

       const updateProduct = await this.propertyRepository.findOneBy({
        id: propertyId,
       });
       return updateProduct;
    }
}
