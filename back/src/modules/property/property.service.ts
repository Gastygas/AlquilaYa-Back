import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FileUploadRespository } from '../file-upload/file-upload.repository';
import { Repository } from 'typeorm';
import { Property } from 'src/entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/entities/user.entity';
import { FileUploadService } from '../file-upload/file-upload.service';
import { disableDayDto } from './dto/disableday.dto';

@Injectable()
export class PropertyService {
  constructor(@InjectRepository(Property) private propertyEntity: Repository<Property>,
    private readonly propertyRepository: PropertyRepository,  
    // private readonly fileUploadRepository: FileUploadRespository,
  ){}


  getAllPropertiesService(){
    return this.propertyRepository.getAllPropertiesRepository()
  }
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
 
  getPropertyById(id:string){
    return this.propertyRepository.getPropertyById(id)
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  // async uploadImage(file: Express.Multer.File, propertyId: string): Promise<string> {
  //   // Llamamos al repositorio para subir la imagen a Cloudinary
  //   const response = await this.fileUploadRepository.uploadImage(file);
  //   if (!response.secure_url) {
  //     throw new NotFoundException('Error uploading image to Cloudinary');
  //   }
    
  //   return response.secure_url; // Retornamos la URL segura de la imagen
  // }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  approvePropertyService(id: string) {
    return this.propertyRepository.approvePropertyRepository(id)
  }

  denyPropertyService(id: string) {
    return this.propertyRepository.denyPropertyRepository(id)
  }

  addPropertiesService() {
    return this.propertyRepository.addPropertiesRepository();
  }

  async createProperty(newProperty: CreatePropertyDto, userId:string) {
    return this.propertyRepository.createProperty(newProperty,userId)
  }

  addReservedDaysService(propertyId: string,dates:disableDayDto) {
    return this.propertyRepository.addReservedDaysRepository(propertyId,dates)
  }

  addDisableDaysService(propertyId: string,dates:disableDayDto) {
    return this.propertyRepository.addDisableDaysRepository(propertyId,dates)
  }

  cancelDisableDaysService(propertyId: string,dates:disableDayDto){
    return this.propertyRepository.cancelDisableDays(propertyId,dates)
  }

}
