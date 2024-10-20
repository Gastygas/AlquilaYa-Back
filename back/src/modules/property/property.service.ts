import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  addPropertiesService() {
    throw new Error('Method not implemented.');
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  create(createPropertyDto) {
    return 'This action adds a new property';
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
