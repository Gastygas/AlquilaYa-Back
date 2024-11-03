import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadoPago.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { BookingRepository } from '../booking/booking.repository';


@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService,
    private readonly bookingRepository: BookingRepository
  ) {}

  @Post("")
  createOrder(@Body() body: any): Promise<any> {
   
    
    const booking = {
      propertyId: body.booking.propertyId,
      dateStart: body.booking.dateStart,
      dateEnd: body.booking.dateEnd
    }

    this.bookingRepository.createBooking(booking,body.userId);
    
    console.log("success");
    
     return this.mercadoPagoService.createPreference(body);
  }

  @Get('success')
  success(@Res() res) {
    console.log('success');
  
  }

  @Get('failure')
  failure(@Res() res) {
    console.log('failure');
    res.redirect('https://localhost:3000/login'); // crear vista de pago fallido
  }

}
