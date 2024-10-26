import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService , MercadoPagoService],
})
export class PaymentsModule {}
