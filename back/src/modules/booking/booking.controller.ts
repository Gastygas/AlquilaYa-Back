import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ICustomRequest } from '../property/interface/customRequest';
import { AuthGuard } from 'src/guards/authGuard';
import { Dateinterceptor } from './interceptors/date.interceptor';

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
  @Post("create")
  @UseGuards(AuthGuard)
  @UseInterceptors(Dateinterceptor)
  createBookController(
    @Body() newBooking: CreateBookingDto,
    @Request() req: ICustomRequest,
  ) {
    const userId = req.user.id 
    
    console.log("estamos en booking create");
    
    // return this.bookingService.createBookingService(newBooking,userId , payment);
  }
  

  @ApiBearerAuth()
  @Patch('cancel/:id')
  @UseGuards(AuthGuard)
  cancelBookController(
    @Param("id",ParseUUIDPipe) id: string,
    @Request() req: ICustomRequest
  ){
    const userId = req.user.id
    return this.bookingService.cancelBookService(id,userId)
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
