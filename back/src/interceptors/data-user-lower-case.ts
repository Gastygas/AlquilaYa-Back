import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserLowerCaseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();
         const data = request.body;
         
         data.email ? data.email = data.email.toLowerCase() : '' // SignIn
         data.address ? data.address = data.address.toLowerCase() : ''
         data.country ? data.country = data.country.toLowerCase() : '' 
         data.name ? data.name = data.name.toLowerCase() : ''
         data.surname ? data.surname = data.surname.toLowerCase() : ''
         
         return next.handle();
    }   
}