import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import sgMail from '@sendgrid/mail'
import { Email } from "src/entities/email.entity";
import { Repository } from "typeorm";
import { EmailRepository } from "./email.repository";

@Injectable()
export class EmailService{

    constructor(private readonly emailRepository:EmailRepository){}

    getAllEmailsService() {
        return this.emailRepository.getAllEmailsRepository()
    }
    getEmailById(id: string) {
        return this.emailRepository.getEmailByIdRepository(id)
    }

    async sendEmailRegisterSuccessfully(email:string,name:string){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.send({
            to: `${email}`,
            from: process.env.FROM_EMAIL,
            subject:`Registro exitoso!`,
            text:`Felicitaciones ${name}! `,
            html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Registro Exitoso</title><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#ffffff;font-family:'Figtree',sans-serif;}.container{max-width:600px;width:100%;background-color:#190045;padding:20px;border-radius:20px;text-align:center;box-shadow:0px 4px 8px rgba(0,0,0,0.2);}h2{color:#9AEDFF;font-size:24px;font-weight:900;margin-bottom:10px;}p{font-size:16px;font-weight:400;line-height:1.6;color:#ededed;margin:0;margin-bottom:15px;}a.button{display:inline-block;margin-top:20px;padding:12px 24px;background-color:#2CFFDE;color:#000000;text-decoration:none;border-radius:8px;font-weight:900;}img{width:150px;margin:0 auto 20px;border-radius:50%;}.footer{margin-top:30px;font-size:14px;color:#ededed;}</style></head><body><div class="container"><img src="https://res.cloudinary.com/dbmfju6mu/image/upload/v1729830525/alquilaYa_logo_csaxln.jpg" alt="Logo"/><h2>¡Bienvenido ${name}!</h2><p>Te has registrado correctamente en nuestra plataforma. Nos alegra mucho tenerte con nosotros.</p><p>A partir de ahora, podrás acceder a las mejores propiedades para alquiler y disfrutar de un servicio confiable y seguro.</p><p>Vuelve a nuestra página a buscar tu mejor alquiler. Te estamos esperando con las mejores opciones para ti.</p><a href="#" class="button">Ir a la Página</a><div class="footer"><p>¡Gracias por confiar en nosotros!</p></div></div></body></html>`
        })
        .then(() => { 
            console.log({success:'Email has been sent'});
            return {success:'Email has been sent'} 
        })
        .catch((err) => {console.log('error al mandar el mail',err.message)}
        )
    }   

    async sendEmailCreatePropertySuccessfully(email:string,name:string,propertyId:string){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.send({
            to: `${email}`,
            from: process.env.FROM_EMAIL,
            subject:`Propiedad Aprobada!`,
            text:`Felicitaciones ${name}! `,
            html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Propiedad Aprobada</title><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#ffffff;font-family:"Figtree",sans-serif;} .container{max-width:600px;width:100%;background-color:#190045;padding:20px;border-radius:20px;text-align:center;box-shadow:0px 4px 8px rgba(0,0,0,0.2);} h2{color:#9AEDFF;font-size:24px;font-weight:900;margin-bottom:10px;} p{font-size:16px;font-weight:400;line-height:1.6;color:#ededed;} a.button{display:inline-block;margin-top:20px;padding:12px 24px;background-color:#2CFFDE;color:#000000;text-decoration:none;border-radius:8px;font-weight:900;} .footer{margin-top:30px;font-size:14px;color:#ededed;} img{width:150px;margin:0 auto 20px;border-radius:50%;} </style></head><body><div class="container"><img src="https://res.cloudinary.com/dbmfju6mu/image/upload/v1729830525/alquilaYa_logo_csaxln.jpg" alt="Logo"/><h2>¡Tu propiedad ha sido aprobada!</h2><p>Hola ${name}, nos complace informarte que tu propiedad ha sido aprobada y ya está publicada en nuestra plataforma.</p><p>Ahora los usuarios podrán verla y contactarte para más información. ¡Esperamos que encuentres el inquilino ideal pronto!</p><p>Vuelve a nuestra página para ver cómo se ve tu anuncio o realizar cualquier ajuste necesario.</p><a href="${process.env.URL_FRONT}/propiedades/${propertyId}" class="button">Ver Mi Propiedad</a><div class="footer"><p>Gracias por confiar en nosotros y ser parte de nuestra comunidad.</p></div></div></body></html>`
        })
        .then(() => { 
            console.log({success:'Email has been sent'});
            return {success:'Email has been sent'} 
        })
        .catch((err) => {console.log('error al mandar el mail',err.message)}
        )
    }   

    async sendEmailCreatePropertyDeny(email:string,name:string){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.send({
            to: `${email}`,
            from: process.env.FROM_EMAIL,
            subject:`Propiedad Denegada`,
            text:`Lo sentimos`,
            html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Propiedad No Aprobada</title><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#ffffff;font-family:"Figtree",sans-serif;} .container{max-width:600px;width:100%;background-color:#190045;padding:20px;border-radius:20px;text-align:center;box-shadow:0px 4px 8px rgba(0,0,0,0.2);} h2{color:#FF6B6B;font-size:24px;font-weight:900;margin-bottom:10px;} p{font-size:16px;font-weight:400;line-height:1.6;color:#ededed;} a.button{display:inline-block;margin-top:20px;padding:12px 24px;background-color:#FF6B6B;color:#000000;text-decoration:none;border-radius:8px;font-weight:900;} .footer{margin-top:30px;font-size:14px;color:#ededed;} img{width:150px;margin:0 auto 20px;border-radius:50%;} </style></head><body><div class="container"><img src="https://res.cloudinary.com/dbmfju6mu/image/upload/v1729830525/alquilaYa_logo_csaxln.jpg" alt="Logo"/><h2>¡Lo sentimos, tu propiedad no fue aprobada!</h2><p>Hola ${name}, lamentamos informarte que tu propiedad no cumple con algunos de los requisitos para ser publicada en nuestra plataforma.</p><p>Puedes revisar los detalles y realizar los ajustes necesarios para enviarla nuevamente.</p><a href="#" class="button">Ver Requisitos</a><div class="footer"><p>Gracias por tu comprensión y por ser parte de nuestra comunidad.</p></div></div></body></html>`
        })
        .then(() => { 
            console.log({success:'Email has been sent'});
            return {success:'Email has been sent'} 
        })
        .catch((err) => {console.log('error al mandar el mail',err.message)}
        )
    }   

    async sendEmailBookSuccesfully(email:string,bookingId,paymentId,propertyId){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.send({
            to: `${email}`,
            from: process.env.FROM_EMAIL,
            subject:`Reserva Aprobada`,
            text:`Felicidades`,
            html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#ffffff;font-family:'Figtree',sans-serif;}.container{max-width:600px;width:100%;background-color:#190045;padding:20px;border-radius:20px;text-align:center;box-shadow:0px 4px 8px rgba(0,0,0,0.2);color:#ededed;}h1{font-size:24px;font-weight:900;margin-bottom:10px;color:#9aedff;}h2,p{margin:0;margin-bottom:15px;}p{font-size:16px;font-weight:400;line-height:1.6;}a{color:#9AEDFF;text-decoration:none;font-weight:bold;}a.button{display:inline-block;margin-top:20px;padding:12px 24px;background-color:#2CFFDE;color:#000000;text-decoration:none;border-radius:8px;font-weight:900;}.logo{text-align:center;margin-bottom:20px;}img{width:150px;margin:0 auto 20px;border-radius:50%;}.footer{margin-top:30px;font-size:14px;color:#ededed;}</style></head><body><div class="container"><div class="logo"><img src="https://res.cloudinary.com/dbmfju6mu/image/upload/v1729830525/alquilaYa_logo_csaxln.jpg" alt="Logo"/></div><h1>¡Reserva Exitosa!</h1><p>${name}, tu reserva ha sido confirmada correctamente. Aquí tienes los detalles de tu reserva:</p><p><strong>ID de la Reserva:</strong> ${bookingId}</p><p><strong>ID del Pago:</strong>${propertyId}</p><p>Puedes ver los detalles de la propiedad en el siguiente enlace</p><a class="button" href="${process.env.URL_FRONT}/property/${propertyId}">Ver Propiedad</a><div class="footer"><p>Gracias por confiar en AlquilaYa. ¡Esperamos que disfrutes tu estancia!</p></div></div></body></html>`
        })
        .then(() => { 
            console.log({success:'Email has been sent'});
            return {success:'Email has been sent'} 
        })
        .catch((err) => {console.log('error al mandar el mail',err.message,err.response.body.errors)}
        )
    }   
    async sendEmailBookComment(email:string,name:string){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.send({
            to: `${email}`,
            from: process.env.FROM_EMAIL,
            subject:`Tu opinion es importante`,
            text:`Que te parecio tu estadia?`,
            html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Opinión sobre tu Estancia</title><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#ffffff;font-family:'Figtree',sans-serif;}.container{max-width:600px;width:100%;background-color:#190045;padding:20px;border-radius:20px;text-align:center;box-shadow:0px 4px 8px rgba(0,0,0,0.2);color:#ededed;}h2{color:#9AEDFF;font-size:24px;font-weight:900;margin-bottom:10px;}p{font-size:16px;font-weight:400;line-height:1.6;margin:0;margin-bottom:15px;}a{color:#9AEDFF;text-decoration:none;font-weight:bold;}a.button{display:inline-block;margin-top:20px;padding:12px 24px;background-color:#2CFFDE;color:#000000;text-decoration:none;border-radius:8px;font-weight:900;}.logo{text-align:center;margin-bottom:20px;}img{width:150px;margin:0 auto 20px;border-radius:50%;}.footer{margin-top:30px;font-size:14px;color:#ededed;}</style></head><body><div class="container"><div class="logo"><img src="https://res.cloudinary.com/dbmfju6mu/image/upload/v1729830525/alquilaYa_logo_csaxln.jpg" alt="Logo"/></div><h2>¡Hola ${name}!</h2><p>Esperamos que hayas disfrutado de tu estancia en la propiedad que alquilaste.</p><p>Nos encantaría conocer tu opinión. Te invitamos a que dejes un comentario sobre tu experiencia.</p><p>Puedes dejar tu comentario haciendo clic en el siguiente enlace:</p><a class="button" href="">Dejar Comentario</a><div class="footer"><p>¡Gracias por confiar en AlquilaYa! Tu opinión es muy valiosa para nosotros.</p></div></div></body></html>`
        })
        .then(() => { 
            console.log({success:'Email has been sent'});
            return {success:'Email has been sent'} 
        })
        .catch((err) => {
            if (err.response) {
                console.error('Response body:', err.response.body);
                console.error('Errors:', err.response.body.errors);
            }}
        )
    }   
    
    async sendEmailForgotPassword(email: string) {
        const emailDb:Email = await this.emailRepository.createEmailRepository(email)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        sgMail.send({
            to: `${email}`,
            from: process.env.FROM_EMAIL,
            subject:`Recupera tu contraseña`,
            text:`Hola buenas, nos pediste recuperar tu contraseña`,
            html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Restablecimiento de Contraseña</title><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#ffffff;font-family:"Figtree",sans-serif;}.container{max-width:600px;width:100%;background-color:#190045;padding:20px;border-radius:20px;text-align:center;box-shadow:0px 4px 8px rgba(0,0,0,0.2);}h2{color:#9AEDFF;font-size:24px;font-weight:900;margin-bottom:10px;}p{font-size:16px;font-weight:400;line-height:1.6;color:#ededed;margin:0;margin-bottom:15px;}a{color:#9AEDFF;text-decoration:none;font-weight:bold;}a.button{display:inline-block;margin-top:20px;padding:12px 24px;background-color:#2CFFDE;color:#000000;text-decoration:none;border-radius:8px;font-weight:900;}img{width:150px;margin:0 auto 20px;border-radius:50%;}.footer{margin-top:30px;font-size:14px;color:#ededed;}</style></head><body><div class="container"><img src="https://res.cloudinary.com/dbmfju6mu/image/upload/v1729830525/alquilaYa_logo_csaxln.jpg" alt="Logo"/><h2>¡Restable tu Contraseña!</h2><p>Hola, hemos recibido una solicitud para restablecer tu contraseña.</p><p>Si no has solicitado esto, puedes ignorar este mensaje.</p><a href="${process.env.URL_FRONT}/change-password?idEmail=${emailDb.id}&email=${email}" class="button">Restablecer Contraseña</a><div class="footer"><p>Si tienes alguna duda, por favor contáctanos.</p></div></div></body></html>`
        })
        .then(() => { 
            console.log({success:'Email has been sent'});
            return {success:'Email has been sent'} 
        })
        .catch((err) => {
            if (err.response) {
                console.error('Response body:', err.response.body);
                console.error('Errors:', err.response.body.errors);
            }}
        )
    }   

    
}