import { Injectable } from '@nestjs/common';
import { preference } from 'src/config/mercadopago';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Injectable()
export class MercadoPagoService {
  async createPreference(body: any) {
    const preferenceData = {
      items: body.items.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
      back_urls: {
        success: "https://3a97-45-189-218-73.ngrok-free.app/mercadopago/success",
        failure: "https://3a97-45-189-218-73.ngrok-free.app/mercadopago/failure", 
      },
      
    };

    try {
      const response = await preference.create({ body: preferenceData });
      return { preferenceId: response.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPaymentDetails(paymentId: string) {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });

    return response.json();
  }
}