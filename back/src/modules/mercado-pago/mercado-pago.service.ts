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

  async createPayment(createPaymentDto: CreateMercadoPagoDto) {
    const { amount, description, externalReference } = createPaymentDto;

    const paymentData = {
      transaction_amount: amount,
      description,
      external_reference: externalReference,
      payment_method_id: 'visa', // Ejemplo: Puedes configurar la tarjeta
      installments: 1, // Número de cuotas
      payer: {
        email: 'customer@example.com',
      },
      auto_return: 'approved',
      back_urls: {
        success: 'http://your-domain.com/success', // URL de éxito
        failure: 'http://your-domain.com/failure', // URL de fallo
      },
      notification_url: 'http://your-domain.com/webhook', // URL de webhook (opcional)
    };

    try {
      const payment = await this.mercadopago.payment.create(paymentData);
      return payment.body;
    } catch (error) {
      console.error('Error al crear el pago:', error);
      throw error;
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
