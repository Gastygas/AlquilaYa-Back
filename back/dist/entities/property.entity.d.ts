import { Booking } from './booking.entity';
import { SpecialPrice } from './specialPrice.entity';
export declare class Property {
    id: string;
    adress: string;
    adressUrl: string;
    bill: string;
    country: string;
    city: string;
    price: number;
    capacity: number;
    bedrooms: number;
    bathrooms: number;
    wifi: boolean;
    petFriendly: boolean;
    airConditioning: boolean;
    heating: boolean;
    pool: boolean;
    parking: boolean;
    description: string;
    propertyStatus: string;
    bookings: Booking[];
    specialprice: SpecialPrice[];
}
