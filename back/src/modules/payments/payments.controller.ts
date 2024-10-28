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


  @Get("")
  getPayments() {
    return this.paymentsService.getAllPayments();
  }
  @Post('webhook')
  async handlePaymentUpdate(@Body() body: any, @Res() res: Response) {
    
    return this.paymentsService.createPayment(body.data?.id, 'a5a5943f-c830-4bed-9fad-9a760e5592c1'); //tiene que llegar el id por el front  (actualmente hardcodedo)
  }
}
