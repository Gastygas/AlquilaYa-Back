export class CreatePaymentDto {
    method : string;
    date : Date;
    transactionId: string;
    amount: number;
    paymentStatus : "approved" | "pending" | "failed" | "cancelled" | "refunded"
}
