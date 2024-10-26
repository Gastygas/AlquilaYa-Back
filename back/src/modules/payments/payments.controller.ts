import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService,
    private readonly mercadoPagoService: MercadoPagoService
  ) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Post('webhook')
  async handlePaymentUpdate(@Body() body: any, @Res() res: Response) {
      console.log('Received webhook:', body);

      console.log(body.id);
      
     
      if (body.action === 'payment.updated') {
          console.log('Payment updated:', body.data.id);
      }
      
      const paymentId = body.data?.id;
      console.log( await this.mercadoPagoService.getPaymentDetails(paymentId));
      

      // return this.mercadoPagoService.getPaymentDetails(body.id);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
