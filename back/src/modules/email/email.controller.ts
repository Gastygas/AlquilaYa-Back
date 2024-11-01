import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { strategies } from "passport";
import { EmailDto } from "./dto/email.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("email")
@Controller('email')
export class EmailController{
    constructor(private readonly emailService: EmailService){}

    @Post("signup")
    async sendEmailRegisterSuccessfullyController(
        @Body() data: EmailDto
    ){
        const {email,name} = data
        return this.emailService.sendEmailRegisterSuccessfully(email,name)
    }
    @Post("createproperty")
    async sendEmailCreatePropertySuccessfullyController(
        @Body() data: EmailDto
    ){
        const {email,name} = data
        return this.emailService.sendEmailCreatePropertySuccessfully(email,name)
    }
    @Post("propertydeny")
    async sendEmailCreatePropertyDenyController(
        @Body() data: EmailDto
    ){
        const {email,name} = data
        return this.emailService.sendEmailCreatePropertyDeny(email,name)
    }
    @Post("book")
    async sendEmailBookSuccessfullyController(
        @Body() data: EmailDto
    ){
        const {email,name} = data
        return this.emailService.sendEmailBookSuccesfully(email,name)
    }
    @Post("comment")
    async sendEmailBookComment(
        @Body() data: EmailDto
    ){
        const {email,name} = data
        return this.emailService.sendEmailBookComment(email,name)
    }
    @Post("forgotpassword")
    async sendEmailForgotPassword(
        @Body() data: EmailDto
    ){
        const {email} = data
        return this.emailService.sendEmailForgotPassword(email)
    }
}