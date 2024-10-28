import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/entities/payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentsRepository{
    constructor(@InjectRepository(Payment) private readonly paymentEntity: Repository<Payment>){}


    async createPayment(payment: any) {
        const paymentEntity = this.paymentEntity.create(payment); 
        return await this.paymentEntity.save(paymentEntity); 
    }
    
    async getAllPayments() {
        const payments = await this.paymentEntity.find();
        return payments;
    }

    async getPaymentByTransactionId(paymentId: string) {
        const payment = await this.paymentEntity.findOneBy({transactionId: paymentId});
        return payment;
    }
  
}