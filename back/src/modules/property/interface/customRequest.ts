import { User } from "src/entities/user.entity";
import { Request } from "express";

export interface CustomRequest extends Request{
    user:Partial<User>
}