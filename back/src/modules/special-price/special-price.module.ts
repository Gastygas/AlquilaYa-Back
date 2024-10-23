import { Module } from '@nestjs/common';
import { SpecialPriceService } from './special-price.service';
import { SpecialPriceController } from './special-price.controller';

@Module({
  controllers: [SpecialPriceController],
  providers: [SpecialPriceService],
})
export class SpecialPriceModule {}
