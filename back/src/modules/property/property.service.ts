import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository){}


  getAllPropertiesService(){
    return this.propertyRepository.getAllPropertiesRepository()
  }
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  addPropertiesService() {
    return this.propertyRepository.addPropertiesRepository();
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  createProperty(newProperty:CreatePropertyDto,id:string) {
    return this.propertyRepository.createProperty(newProperty,id);
  }



  findAll() {
    return `This action returns all property`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
