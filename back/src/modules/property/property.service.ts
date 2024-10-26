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
    private readonly fileUploadRepository: FileUploadRespository,
    private readonly userRepository: UsersRepository,
    private readonly fileUploadService: FileUploadService,

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

  async uploadImage(file: Express.Multer.File, propertyId: string): Promise<string> {
    // Llamamos al repositorio para subir la imagen a Cloudinary
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('Error uploading image to Cloudinary');
    }
    
    return response.secure_url; // Retornamos la URL segura de la imagen
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------


  addPropertiesService() {
    return this.propertyRepository.addPropertiesRepository();
  }

  async createProperty(newProperty: CreatePropertyDto, userId:string, file?: Express.Multer.File) {
    
    const propertyExists = await this.propertyEntity.findOne({ where: { address: newProperty.address } });
    if (propertyExists) throw new BadRequestException('Address already used');

    const createdProperty = this.propertyEntity.create(newProperty);
    await this.propertyEntity.save(createdProperty);

    const userDb: Omit<User, 'password'> = await this.userRepository.getUserById(userId);
    if (!userDb) throw new BadRequestException('user id not found');

    // Creamos la propiedad con los datos proporcionados
    const createProperty: Property = await this.propertyEntity.create({
      user: userDb,
      ...newProperty,
    });
    const savedProperty = await this.propertyEntity.save(createProperty);
    // Si hay un archivo, lo subimos a Cloudinary
    if (file) {
      const imageUrl = await this.fileUploadService.uploadImage(file);
      savedProperty.photos = [imageUrl]
      await this.propertyEntity.save(savedProperty)

    }

    return { success: 'Property has been added', property: savedProperty };
  }

  async uploadImageToProperty(propertyId: string, file: Express.Multer.File) {
    const uploadResult = await this.fileUploadRepository.uploadImage(file);
    const fileUrl = uploadResult.secure_url; 
    console.log("imagen cargada: ", fileUrl);
    
    const property = await this.propertyEntity.findOne({where: {id: propertyId} });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    if (!Array.isArray(property.photos)) {
      property.photos = [];  
    }  
    property.photos.push(fileUrl);  
    return this.propertyEntity.save(property);
  }

  addDisablesDayService(propertyId: string,dates:disableDayDto) {
    return this.propertyRepository.addDisablesDayRepository(propertyId,dates)
  }


  findAll() {
    return `This action returns all property`;

  }
  update(id: number, updatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
