import { Injectable } from '@nestjs/common';
import { CreateSpecialPriceDto } from './dto/create-special-price.dto';
import { UpdateSpecialPriceDto } from './dto/update-special-price.dto';

@Injectable()
export class SpecialPriceService {
  create(createSpecialPriceDto: CreateSpecialPriceDto) {
    return 'This action adds a new specialPrice';
  }

  findAll() {
    return `This action returns all specialPrice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialPrice`;
  }

  update(id: number, updateSpecialPriceDto: UpdateSpecialPriceDto) {
    return `This action updates a #${id} specialPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialPrice`;
  }
}
