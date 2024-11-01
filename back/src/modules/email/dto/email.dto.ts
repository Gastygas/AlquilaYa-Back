import { IsNotEmpty } from "class-validator";

export class EmailDto {
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    name:string;

    propertyId?:string
}