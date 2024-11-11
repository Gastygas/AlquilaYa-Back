import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Email } from "src/entities/email.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmailRepository{
    constructor(
        @InjectRepository(Email)
        private readonly emailRepository: Repository<Email>
    ){}

    async getAllEmailsRepository():Promise<Email[]> {
        return await this.emailRepository.find()
    }

    async getEmailByIdRepository(id: string):Promise<Email> {
        const email = await this.emailRepository.findOne({where:{id}})
        if(!email) throw new BadRequestException("email never was sent")
        return email
    }

    async createEmailRepository(email:string){
        const newEmail = this.emailRepository.create({email,createdAt: new Date().toLocaleDateString()})
        await this.emailRepository.save(newEmail)
        return newEmail
    }
}