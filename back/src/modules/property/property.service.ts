import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FileUploadRespository } from '../file-upload/file-upload.repository';
import { Repository } from 'typeorm';
import { Property } from 'src/entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertyService {
  constructor(@InjectRepository(Property) private propertyRep: Repository<Property>,
    private readonly propertyRepository: PropertyRepository,  
    private readonly fileUploadRepository: FileUploadRespository
  ){}


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

  async createProperty(newProperty: CreatePropertyDto, file?: Express.Multer.File) {
    const propertyExists = await this.propertyRep.findOne({ where: { address: newProperty.address } });
    if (propertyExists) throw new BadRequestException('Address already used');

    const createdProperty = this.propertyRep.create(newProperty);
    await this.propertyRep.save(createdProperty);

    // Si hay un archivo, lo subimos a Cloudinary
    if (file) {
      const response = await this.fileUploadRepository.uploadImage(file);
      if (!response.secure_url) {
        throw new NotFoundException('Error uploading image to Cloudinary');
      }

      // Actualizamos la propiedad con la URL de la imagen subida
      createdProperty.photos = [response.secure_url]; // O actualiza si ya tiene fotos
      await this.propertyRep.save(createdProperty);
    }

    return { success: 'Property has been added', property: createdProperty };
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
