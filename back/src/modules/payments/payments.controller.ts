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
import { BookingService } from '../booking/booking.service';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly bookingService: BookingService,
  ) {}

  @Get('')
  getPayments() {
    return this.paymentsService.getAllPayments();
  }
  @Post('webhook')
  async handlePaymentUpdate(@Body() body: any) {
    // Extrae los valores directamente
    
    // const booking = {
    //   propertyId: body.bookingData.propertyId,
    //   dateStart: body.bookingData.dateStart,
    //   dateEnd: body.bookingData.dateEnd,
    // };

    // const userId = body.userId;

    // return await this.paymentsService.createPaymentAndBooking(
    //   body.data?.id,
    //   booking,
    //   userId,
    // );
  }
}
