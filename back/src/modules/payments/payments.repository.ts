import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentsRepository{
    constructor(){}

    async getPayments(){
        return "Get All Payments";
    }
}