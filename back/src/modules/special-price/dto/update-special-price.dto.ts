import { PartialType } from '@nestjs/swagger';
import { CreateSpecialPriceDto } from './create-special-price.dto';

export class UpdateSpecialPriceDto extends PartialType(CreateSpecialPriceDto) {}
