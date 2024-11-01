import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { PropertyRepository } from '../property/property.repository';
import { BookingRepository } from './booking.repository';
import { Property } from 'src/entities/property.entity';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../email/email.service';
import { Email } from 'src/entities/email.entity';
import { EmailRepository } from '../email/email.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Booking,Property,User,Email])],
  controllers: [BookingController],
  providers: [BookingService,BookingRepository,PropertyRepository,UsersRepository,EmailService,EmailRepository],
})
export class BookingModule {}
