import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags } from '@nestjs/swagger';
import { ICustomRequest } from '../property/interface/customRequest';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  
  @Get()
  getBookingsController() {
    return this.bookingService.getBookingsService();
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookingService.findOne(+id);
  // }
  
  @Post()
  create(
    @Request() req: ICustomRequest,
    @Body() createBookingDto: CreateBookingDto) {
    const userId = req.user.id
    return this.bookingService.createBookingService(createBookingDto,userId);
  }
  

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookingService.remove(+id);
  // }
}
