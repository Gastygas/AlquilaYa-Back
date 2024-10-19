import { User } from './user.entity';
import { Property } from './property.entity';
import { Payment } from './payment.entity';
export declare class Booking {
    id: string;
    dateStart: Date;
    dateEnd: Date;
    bookingStatus: boolean;
    user: User;
    property: Property;
    payment: Payment;
}
