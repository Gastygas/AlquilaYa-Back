import { Property } from "./property.entity";
export declare class SpecialPrice {
    id: string;
    dateStart: Date;
    dateEnd: Date;
    specialPrice: number;
    property: Property;
}
