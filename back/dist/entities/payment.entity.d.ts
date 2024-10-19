import { Booking } from './booking.entity';
export declare class Payment {
    id: string;
    method: string;
    date: Date;
    amount: number;
    paymentStatus: "completed" | "pending" | "failed" | "cancelled" | "refunded";
    transactionId: string;
    booking: Booking;
}
