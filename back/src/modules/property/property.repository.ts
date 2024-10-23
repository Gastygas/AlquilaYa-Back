import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "src/entities/property.entity";
import { Repository } from "typeorm";
import { CreatePropertyDto } from "./dto/create-property.dto";
import {default as data} from "../../../src/utils/dataProperty.json"
import { UsersRepository } from "../users/users.repository";
import { User } from "src/entities/user.entity";

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
            relations:{
                user:true,
                specialprice:true
            }
          });

        return properties
    }

    async createProperty(newProperty: CreatePropertyDto,id:string = "5790fc20-775c-4f25-a1c5-c2ea311b2509") {
        const propertyExits:Property = await this.propertyRepository.findOne({where:{address: newProperty.address}})
        if(propertyExits) throw new BadRequestException('Address already used')

        const userDb:Omit<User,'password'> = await this.userRepository.getUserById(id)
        if(!userDb) throw new BadRequestException("user id not found")

        const createProperty:Property = await this.propertyRepository.create({user:userDb,...newProperty})
        const savedProperty = await this.propertyRepository.save(createProperty)

        const property:Property = await this.propertyRepository.findOne({where:{id:savedProperty.id},relations:{user:true}})

        // const userResponse = {
        //     id: property.user.id,
        //     name: property.user.name,
        //     email: property.user.email,
        //     // añadir otros campos que queramos mostrar
        // };

        return {success: "Property has been added",
                property,
        }
    }
    
    async addPropertiesRepository(){
        data.forEach(async(property) => await this.createProperty(property,"3e3b86f8-4e84-4651-b64b-94314243609a"))
        return {success:"properties has been added"}
    }

}