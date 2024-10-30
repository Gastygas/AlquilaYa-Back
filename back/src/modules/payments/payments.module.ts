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
import { BookingService } from '../booking/booking.service';
import { BookingRepository } from '../booking/booking.repository';
import { Booking } from 'src/entities/booking.entity';
import { PropertyRepository } from '../property/property.repository';
import { PropertyService } from '../property/property.service';
import { Property } from 'src/entities/property.entity';
import { FileUploadRespository } from '../file-upload/file-upload.repository';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment , User , Booking , Property])],
  controllers: [PaymentsController],
  providers: [PaymentsService , MercadoPagoService , PaymentsRepository , UsersRepository , EmailService , BookingService , BookingRepository , PropertyRepository , PropertyService , FileUploadRespository , FileUploadService],
})
export class PaymentsModule {}
