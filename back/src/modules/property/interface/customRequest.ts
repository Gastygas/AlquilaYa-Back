import { User } from "src/entities/user.entity";
import { Request } from "express";
import { Property } from "src/entities/property.entity";

export interface CustomRequest extends Request{
    user:Partial<User>,
    property:Partial<Property>

}