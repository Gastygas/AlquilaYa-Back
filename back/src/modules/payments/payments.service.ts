import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';
import { PaymentsRepository } from './payments.repository';
import { User } from 'mercadopago';
import { UsersRepository } from '../users/users.repository';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly paymentsRepository: PaymentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createPaymentAndBooking(paymentId: string , newBooking: CreateBookingDto, userId: string) {
   return await this.paymentsRepository.createPaymentAndBooking(paymentId , newBooking, userId);
  }

  async getAllPayments() {
    const payments = await this.paymentsRepository.getAllPayments();
    return payments;
  }

  
}
