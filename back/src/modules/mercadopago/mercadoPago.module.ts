import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadoPago.controller';
import { MercadoPagoService } from './mercadoPago.service';


@Module({
  imports: [],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class MercadopagoModule {}