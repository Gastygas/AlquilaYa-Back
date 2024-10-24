import { Injectable } from '@nestjs/common';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';
import * as mercadopago from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  constructor() {
    // Inicializa Mercado Pago con tu token de acceso
    mercadopago.configurations.setAccessToken('YOUR_ACCESS_TOKEN'); // Usa tu token de acceso
  }

  async createPayment(preferenceData: any) {
    try {
      const response = await mercadopago.preferences.create(preferenceData);
      return response.body;
    } catch (error) {
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  // create(createMercadoPagoDto: CreateMercadoPagoDto) {
  //   return 'This action adds a new mercadoPago';
  // }

  // findAll() {
  //   return `This action returns all mercadoPago`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} mercadoPago`;
  // }

  // update(id: number, updateMercadoPagoDto: UpdateMercadoPagoDto) {
  //   return `This action updates a #${id} mercadoPago`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mercadoPago`;
  // }
}
