import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadoPago.service';


@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post("")
  createOrder(@Body() body: any): Promise<any> {
    return this.mercadoPagoService.createPreference(body);
  }

  @Get('success')
  success(@Res() res) {
    console.log('success');
    res.redirect('https://localhost:3000'); // crear vista de pago exitoso
  }

  @Get('failure')
  failure(@Res() res) {
    console.log('failure');
    res.redirect('https://localhost:3000/login'); // crear vista de pago fallido
  }

}
