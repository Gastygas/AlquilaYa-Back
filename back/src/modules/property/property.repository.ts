import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "src/entities/property.entity";
import { Repository } from "typeorm";
import { CreatePropertyDto } from "./dto/create-property.dto";
import {default as data} from "../../../src/utils/dataProperty.json"
import { UsersRepository } from "../users/users.repository";

@Injectable()
export class PropertyRepository{
  
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository:Repository<Property>,
        private readonly userRepository:UsersRepository
    ){}

    async getAllPropertiesRepository(page = 1, limit = 5){
        const properties = await this.propertyRepository.find({
            skip: (page - 1) * limit,
            take: limit,
          });

        return properties
    }

    async createProperty(newProperty: CreatePropertyDto,id?:string) {
        const propertyExits = await this.propertyRepository.findOne({where:{address: newProperty.address}})
        if(propertyExits) throw new BadRequestException('Address already used')

        // const userDb = await this.userRepository.getUserById(id)
        // if(!userDb) throw new BadRequestException("user id not found")

        const createProperty = await this.propertyRepository.create(newProperty)
        await this.propertyRepository.save(createProperty)

        return {success: "Property has been added"}
    }
    
    async addPropertiesRepository(){
        data.forEach(async(property) => await this.createProperty(property))
        return {success:"properties has been added"}
    }

}