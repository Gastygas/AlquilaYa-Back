import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const body = request.body;

        const dateFields = ['dateStart', 'dateEnd'];

        dateFields.forEach(field => {
            if (body[field]) {
                const date = new Date(body[field]);
                if (isNaN(date.getTime())) {
                    throw new BadRequestException(`Invalid date format for ${field}`);
                }
                body[field] = date;
            }
        });

        return next.handle();
    }
}
