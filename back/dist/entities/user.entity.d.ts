import { Notification } from './notification.entity';
import { Reviews } from './reviews.entity';
import { Booking } from './booking.entity';
export declare class User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    dni: string;
    isAdmin: boolean;
    country: string;
    adress: string;
    phone: string;
    favorite_properties: string[];
    notifications: Notification[];
    reviews: Reviews[];
    bookings: Booking[];
}
