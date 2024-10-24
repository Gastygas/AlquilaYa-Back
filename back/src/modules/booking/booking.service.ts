import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository){}
  
  getBookingsService(){
    return this.bookingRepository.getBookings()
  }
  
  createBookingService(createBookingDto: CreateBookingDto,userId) {
    return this.bookingRepository.createBooking(createBookingDto,userId)
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} booking`;
  // }

  // update(id: number, updateBookingDto: UpdateBookingDto) {
  //   return `This action updates a #${id} booking`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} booking`;
  // }
}
