import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { EmailRepository } from "./email.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Email } from "src/entities/email.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Email])],
    controllers:[EmailController],
    providers:[EmailService,EmailRepository]
})
export class EmailModule{

}