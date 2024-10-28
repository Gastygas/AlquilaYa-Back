import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';
import { PaymentsRepository } from './payments.repository';
import { User } from 'mercadopago';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly paymentsRepository: PaymentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

async createPayment(paymentId: string, userId: string) {
    const data = await this.mercadoPagoService.getPaymentDetails(paymentId);

    const user = await this.usersRepository.getUserById(userId);
    
    if (data.status === 'approved') {
      const newPayment = await this.paymentsRepository.createPayment({
        transactionId: data?.id ?? 'default_id',
        method: data.payment_method?.type ?? 'default_method', // Si es undefined, usa un valor predeterminado
        amount: data.transaction_amount ?? 0,
        paymentStatus: data.status ?? 'default_method',
        date: new Date(),

    });

    return newPayment;
    }

    
}

async getAllPayments() {
    const payments = await this.paymentsRepository.getAllPayments();
    return payments;  
}
}
