import { Injectable } from '@nestjs/common';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';

@Injectable()
export class MercadoPagoService {
  create(createMercadoPagoDto: CreateMercadoPagoDto) {
    return 'This action adds a new mercadoPago';
  }

  findAll() {
    return `This action returns all mercadoPago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mercadoPago`;
  }

  update(id: number, updateMercadoPagoDto: UpdateMercadoPagoDto) {
    return `This action updates a #${id} mercadoPago`;
  }

  remove(id: number) {
    return `This action removes a #${id} mercadoPago`;
  }
}
