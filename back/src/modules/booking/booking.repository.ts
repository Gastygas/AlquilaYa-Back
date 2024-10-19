import { Injectable } from "@nestjs/common";

@Injectable()
export class BookingRepository{
    constructor(){}

    async getBookings(){
        return "Get All Bookings";
    }
}