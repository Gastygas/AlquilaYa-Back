import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';
import { BookingService } from '../booking/booking.service';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly bookingService: BookingService,
  ) {}

  async getAllPayments() {
    const payments = await this.paymentRepository.find();
    return payments;
  }

  async getPaymentByTransactionId(paymentId: string) {
    const payment = await this.paymentRepository.findOneBy({
      transactionId: paymentId,
    });
    return payment;
  }

  async createPaymentAndBooking(
    paymentId: string,
    newBooking: CreateBookingDto,
    userId: string,
  ) {
    const data = await this.mercadoPagoService.getPaymentDetails(paymentId);
    console.log("paymentId: " , paymentId);
    
    if (data.status == 'approved') {
      

      const { id, payment_method, transaction_amount, status } = data;
      const payment = this.paymentRepository.create({
        transactionId: id,
        paymentStatus: status,
        method: payment_method.type,
        amount: transaction_amount,
        date: new Date(),
      });

      

      await this.paymentRepository.save(payment);

      console.log(' 3  newbooking: ', newBooking);

      const book = await this.bookingService.createBookingService(
        newBooking,
        userId,
        payment 
        );

      console.log(book);
      console.log(payment);

      return  book ;
    }

  
  }
}
