import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadoPago.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { BookingRepository } from '../booking/booking.repository';
import { PaymentsRepository } from '../payments/payments.repository';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly bookingRepository: BookingRepository,
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  @Post('')
  createOrder(@Body() body: any): Promise<any> {
    return this.mercadoPagoService.createPreference(body);
  }

  @Get('success')
  async success(@Res() res) {
    const { paymentId, bookingData } =
      await this.mercadoPagoService.destructure(res.req.url);

    const booking = {
      propertyId: bookingData.booking.propertyId,
      dateStart: bookingData.booking.dateStart,
      dateEnd: bookingData.booking.dateEnd,
    };

    console.log('booking en el controller: ', booking);

    await this.paymentsRepository.createPaymentAndBooking(
      paymentId,
      booking,
      bookingData.userId,
    );

    res.redirect('http://localhost:3000/success');
  }

  @Get('failure')
  failure(@Res() res) {
    console.log('failure');
    res.redirect('https://localhost:3000/login'); // crear vista de pago fallido
  }
}
