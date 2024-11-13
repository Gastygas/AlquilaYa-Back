import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadoPago.controller';
import { MercadoPagoService } from './mercadoPago.service';
import { BookingRepository } from '../booking/booking.repository';
import { BookingService } from '../booking/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { PropertyRepository } from '../property/property.repository';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { PropertyService } from '../property/property.service';
import { Property } from 'src/entities/property.entity';
import { EmailService } from '../email/email.service';
import { EmailRepository } from '../email/email.repository';
import { Email } from 'src/entities/email.entity';
import { Payment } from 'src/entities/payment.entity';
import { PaymentsRepository } from '../payments/payments.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Booking , User , Property , Email , Payment]),],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService , PaymentsRepository , BookingRepository , BookingService , PropertyRepository , UsersRepository , PropertyService , EmailService , EmailRepository ],
})
export class MercadopagoModule {}