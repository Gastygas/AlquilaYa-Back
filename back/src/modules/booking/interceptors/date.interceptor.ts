import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class Dateinterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { dateStart, dateEnd } = request.body;
    
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
        if (!datePattern.test(dateStart) || !datePattern.test(dateEnd)) {
          throw new BadRequestException("Invalid dates. tip: the format of dates has to be dd/MM/yyyy");
        }
    
        return next.handle();
      }
}
