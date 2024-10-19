import { SpecialPriceService } from './special-price.service';
import { CreateSpecialPriceDto } from './dto/create-special-price.dto';
import { UpdateSpecialPriceDto } from './dto/update-special-price.dto';
export declare class SpecialPriceController {
    private readonly specialPriceService;
    constructor(specialPriceService: SpecialPriceService);
    create(createSpecialPriceDto: CreateSpecialPriceDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSpecialPriceDto: UpdateSpecialPriceDto): string;
    remove(id: string): string;
}
