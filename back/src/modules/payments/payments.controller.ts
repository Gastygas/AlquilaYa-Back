import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}

  @Post('webhook')
  async handlePaymentUpdate(@Body() body: any, @Res() res: Response) {
    
    return this.paymentsService.createPayment(body.data?.id, '3b768f0b-e86a-4a70-a598-341c342a30a5');
  }
}
