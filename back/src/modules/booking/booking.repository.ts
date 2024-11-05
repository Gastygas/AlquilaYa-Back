import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PropertyRepository } from '../property/property.repository';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/entities/user.entity';
import { IPropertyWithUserId } from '../property/interface/propertyWithUserId';
import { format, parse } from 'date-fns';
import { isDateAvailable } from './utils/isDateAvailable';
import { payment } from 'src/config/mercadopago';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly propertyRepository: PropertyRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async getBookings(page = 1, limit = 5) {
    const findBookings = await this.bookingRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        user: true,
        property: true,
        payment: true,
      },
    });
    const bookings = findBookings.map((booking) => {
      const { user, property, ...restBooking } = booking;
      return {
        ...restBooking,
        property: { id: property.id },
        user: { id: user.id },
      };
    });
    return bookings;
  }

  async getBookingById(id: string) {
    const book = await this.bookingRepository.findOne({
      where: { id },
      relations: { user: true, payment: true, property: true },
    });
    const { user, property, ...restBook } = book;
    return {
      ...restBook,
      user: { id: user.id },
      property: { id: property.id },
    };
  }

  async createBooking(newBooking: CreateBookingDto, userId: string , payment : any ) {
    const propertyFind: IPropertyWithUserId =
      await this.propertyRepository.getPropertyById(newBooking.propertyId);
    if (!propertyFind) throw new BadRequestException('Property id not found');

    // Si alguna de las fechas no está disponible, retorna un error
    if (
      !isDateAvailable(propertyFind, newBooking.dateStart) ||
      !isDateAvailable(propertyFind, newBooking.dateEnd)
    ) {
      throw new BadRequestException('The selected dates are not available.');
    }

    const userDb: Omit<User, 'password'> =
      await this.userRepository.getUserById(userId);
    if (!userDb) throw new BadRequestException('User Id not found');

    const createBooking = await this.bookingRepository.create({
      ...newBooking,
      user: userDb,
      property: propertyFind,
      payment 
      
    });
    const savedBooking = await this.bookingRepository.save(createBooking);

    // await this.propertyRepository  Necesito que llame a una funcion que agregue los dias reservados a disable days
    await this.propertyRepository.addReservedDaysRepository(propertyFind.id, {
      dateEnd: newBooking.dateEnd,
      dateStart: newBooking.dateStart,
    });

    const booking: Booking = await this.bookingRepository.findOne({
      where: { id: savedBooking.id },
      relations: { user: true, property: true, payment: true },
    });
    if (!booking) throw new BadRequestException('Booking no se pudo completar');

    const { user, property, ...restBooking } = booking;

    return {
      success: 'Property has been booked successfully',
      book: {
        ...restBooking,
        user: { id: user.id },
        property: { id: property.id },
        payment
      },
    };
  }

  async cancelBook(id: string, userId: string) {
    const user: Omit<User, 'password'> =
      await this.userRepository.getUserById(userId);

    const book = await this.bookingRepository.findOne({
      where: { id },
      relations: { property: true, user: true },
    });
    if (!book) throw new BadRequestException('Book not found');
    if (!(book.user.id === user.id))
      throw new BadRequestException('User id is not the same who paid de book');
    if (book.bookingStatus === false)
      throw new BadRequestException('your book is cancelled');

    await this.propertyRepository.cancelDisableDays(book.property.id, {
      dateStart: book.dateStart,
      dateEnd: book.dateEnd,
    });

    await this.bookingRepository.update(book, {
      ...book,
      bookingStatus: false,
    });

    return { success: 'Book has been canceled' };
  }
}
