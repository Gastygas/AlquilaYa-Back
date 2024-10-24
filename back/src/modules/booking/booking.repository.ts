import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookingRepository{
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository:Repository<Booking>
    ){}

    async getBookings(page=1,limit=5){
        const findBookings = await this.bookingRepository.find({
            skip: (page - 1) * limit,
            take:limit,
            relations:{
                user:true,
                property:true,
            }
        })

        const bookings = findBookings.map((booking) => {
            const {user,property,...restBooking} = booking
            return {
                ...restBooking,
                property: {id: property.id},
                user: {id: user.id}
            }
        })

        return bookings;
    }
}