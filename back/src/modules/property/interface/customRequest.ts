import { User } from "src/entities/user.entity";
import { Request } from "express";

export interface ICustomRequest extends Request{
    user:Partial<User>
}