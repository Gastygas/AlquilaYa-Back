import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { Repository } from "typeorm";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { PropertyRepository } from "../property/property.repository";
import { UsersRepository } from "../users/users.repository";
import { User } from "src/entities/user.entity";
import { IPropertyWithUserId } from "../property/interface/propertyWithUserId";

@Injectable()
export class BookingRepository{
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository:Repository<Booking>,
        private readonly propertyRepository: PropertyRepository,
        private readonly userRepository:UsersRepository,
    ){}

    async getBookings(page=1,limit=5){
        const findBookings = await this.bookingRepository.find({
            skip: (page - 1) * limit,
            take:limit,
            relations:{
                user:true,
                property:true,
                payment:true,
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

    async getBookingById(id:string){
        const book = await this.bookingRepository.findOne({where:{id},relations:{user:true,payment:true,property:true}})
        const {user,property} = book
        return {
            ...book,
            user:{id: user.id},
            property:{id: property.id}
        }
    }


    async createBooking(newBoking:CreateBookingDto,userId:string){
        const propertyFind:IPropertyWithUserId = await this.propertyRepository.getPropertyById(newBoking.propertyId)
        if(!propertyFind) throw new BadRequestException("Property id not found")

        const userDb:Omit<User,'password'> = await this.userRepository.getUserById(userId) 
        if(!userDb) throw new BadRequestException("User Id not found")
        // const paymentStatus = llamar a una funcion payment que retorne el estado del pago
        // if(!paymentStatus === "completed"){
        // return { err: "el estado del pago es el siguiente"
        // payment: paymentStatus}
        // } 
        //si el payment status es completed seguimos asi

        const createBooking = await this.bookingRepository.create({...newBoking,user:userDb,property:propertyFind})
        const savedBooking= await this.bookingRepository.save(createBooking)

        const booking:Booking = await this.bookingRepository.findOne({where:{id:savedBooking.id},relations:{user:true,property:true,payment:true}})
        if(!booking) throw new BadRequestException("Booking no se pudo completar")
    
        const {user, property ,...restBooking} = booking

        return {
            success:"Property has been booked successfully",
            ...restBooking,
            user:{id:user.id},
            property:{id:property.id}
        }
    }

}