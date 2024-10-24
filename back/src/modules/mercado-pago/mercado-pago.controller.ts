import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreateMercadoPagoDto) {
    try {
      const paymentResponse =
        await this.mercadoPagoService.createPayment(createPaymentDto);
      return paymentResponse;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    // const preferenceData = {
    //   items: [
    //     {
    //       title: createPaymentDto.title,
    //       unit_price: createPaymentDto.price,
    //       quantity: createPaymentDto.quantity,
    //     },
    //   ],
    //   payer: {
    //     email: createPaymentDto.email,
    //   },
    //   back_urls: {
    //     success: 'https://tu-dominio.com/success',
    //     failure: 'https://tu-dominio.com/failure',
    //     pending: 'https://tu-dominio.com/pending',
    //   },
    //   auto_return: 'approved',
    // };

    // const payment = await this.mercadoPagoService.createPayment(preferenceData);
    // return { paymentLink: payment.init_point };
  }

  // @Post()
  // create(@Body() createMercadoPagoDto: CreateMercadoPagoDto) {
  //   return this.mercadoPagoService.create(createMercadoPagoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.mercadoPagoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mercadoPagoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMercadoPagoDto: UpdateMercadoPagoDto) {
  //   return this.mercadoPagoService.update(+id, updateMercadoPagoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mercadoPagoService.remove(+id);
  // }
}
