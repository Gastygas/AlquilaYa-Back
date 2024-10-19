import { CreateSpecialPriceDto } from './dto/create-special-price.dto';
import { UpdateSpecialPriceDto } from './dto/update-special-price.dto';
export declare class SpecialPriceService {
    create(createSpecialPriceDto: CreateSpecialPriceDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSpecialPriceDto: UpdateSpecialPriceDto): string;
    remove(id: number): string;
}
