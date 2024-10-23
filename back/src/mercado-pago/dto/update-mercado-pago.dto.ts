import { PartialType } from '@nestjs/swagger';
import { CreateMercadoPagoDto } from './create-mercado-pago.dto';

export class UpdateMercadoPagoDto extends PartialType(CreateMercadoPagoDto) {}
