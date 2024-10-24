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

@Module({
  imports:[TypeOrmModule.forFeature([Booking,Property,User])],
  controllers: [BookingController],
  providers: [BookingService,BookingRepository,PropertyRepository,UsersRepository,EmailService],
})
export class BookingModule {}
