import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecialPriceService } from './special-price.service';
import { CreateSpecialPriceDto } from './dto/create-special-price.dto';
import { UpdateSpecialPriceDto } from './dto/update-special-price.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('special-price')
@Controller('special-price')
export class SpecialPriceController {
  constructor(private readonly specialPriceService: SpecialPriceService) {}

  @Post()
  create(@Body() createSpecialPriceDto: CreateSpecialPriceDto) {
    return this.specialPriceService.create(createSpecialPriceDto);
  }

  @Get()
  findAll() {
    return this.specialPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialPriceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialPriceDto: UpdateSpecialPriceDto,
  ) {
    return this.specialPriceService.update(+id, updateSpecialPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialPriceService.remove(+id);
  }
}
