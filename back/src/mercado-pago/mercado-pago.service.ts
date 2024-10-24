import { Injectable } from '@nestjs/common';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';
import MercadoPago from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private mercadopago: MercadoPago;
  constructor() {
    this.mercadopago.accessToken = 'process.env.MP_ACCESS_TOKEN';
    //this.mercadopago = new MercadoPago(process.env.MP_ACCESS_TOKEN);

    // // Inicializa Mercado Pago con tu token de acceso
    // MercadoPago.configure({
    //   access_token: 'YOUR_ACCESS_TOKEN', // Reemplaza con tu token de acceso
    // });
  }

  async createPayment(preferenceData: any) {
    try {
      const response = await MercadoPago.preferences.create(preferenceData);
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
