import { Property } from "src/entities/property.entity";

export interface IPropertyWithUserId extends Omit<Property,"user">{
    user:{id: string,status:boolean}
}