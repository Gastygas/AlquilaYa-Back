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
    console.log(data);
    console.log(data.payment_method?.type); // Añadido el operador ?.

    const newPayment = await this.paymentsRepository.createPayment({
        transactionId: data?.id,
        method: data.payment_method?.type ?? 'default_method', // Si es undefined, usa un valor predeterminado
        amount: data.transaction_amount,
        paymentStatus: data.status,
        date: data.date_created,

    });

    return newPayment;
}
}
