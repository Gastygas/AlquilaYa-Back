import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { strategies } from "passport";
import { EmailDto } from "./dto/email.dto";

@Controller('email')
export class EmailController{
    constructor(private readonly emailService: EmailService){}

    @Post()
    async sendEmailController(
        @Body() data: EmailDto
    ){
        const {email,name} = data
        return this.emailService.sendEmailRegisterSuccessfully(email,name)
    }
}