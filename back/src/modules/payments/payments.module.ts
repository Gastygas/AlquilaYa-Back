import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';
import { payment } from 'src/config/mercadopago';
import { PaymentsRepository } from './payments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { UsersRepository } from '../users/users.repository';

import { EmailService } from '../email/email.service';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment , User ])],
  controllers: [PaymentsController],
  providers: [PaymentsService , MercadoPagoService , PaymentsRepository , UsersRepository , EmailService],
})
export class PaymentsModule {}
