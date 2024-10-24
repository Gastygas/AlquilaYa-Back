import { Injectable } from "@nestjs/common";
import sgMail from '@sendgrid/mail'

@Injectable()
export class EmailService{
    constructor(){}

    async sendEmailRegisterSuccessfully(email:string,name:string){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.send({
            to: `${email}`,
            from: process.env.FROM_EMAIL,
            subject:`Registro exitoso!`,
            text:`Felicitaciones ${name}! `,
            html: "<div> <h2>Te has registrado correctamente!</h2></div>"
        })
        .then(() => { 
            return {success:'Email has been sent'} 
        })
        .catch((err) => {console.log('error al mandar el mail',err.message)}
        )
    }

    
}