import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ICustomRequest } from '../property/interface/customRequest';
import { AuthGuard } from 'src/guards/authGuard';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  
  @Get()
  getBookingsController() {
    return this.bookingService.getBookingsService();
  }
  
  @Get(':id')
  getBookgById(@Param('id',ParseUUIDPipe) id: string) {
    return this.bookingService.getBookingById(id);
  }
  
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  createBookController(
    @Body() newBooking: CreateBookingDto,
    @Request() req: ICustomRequest,
  ) {
    const userId = req.user.id
    console.log(userId);
    
    return this.bookingService.createBookingService(newBooking,userId);
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
