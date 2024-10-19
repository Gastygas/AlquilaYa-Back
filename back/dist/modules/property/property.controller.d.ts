import { PropertyService } from './property.service';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: any): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePropertyDto: any): string;
    remove(id: string): string;
}
