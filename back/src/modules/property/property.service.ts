import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Repository } from 'typeorm';
import { Property } from 'src/entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
