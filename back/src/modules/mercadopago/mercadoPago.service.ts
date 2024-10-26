import { Injectable  } from '@nestjs/common';
import { title } from 'process';
import { preference } from 'src/config/mercadopago';
import { Property } from 'src/entities/property.entity';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });
@Injectable()
export class MercadoPagoService {
  

    

  async getPaymentDetails(paymentId: string) {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    });

    return response.json();
  }

  

  async createPreference(body: any) {
    
    
    const preferenceData = {
        items: body.items.map(item  => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),

        back_urls: {
            success: "https://4763-45-189-218-73.ngrok-free.app/payments/webhook",
            failure: "https://loalhost:3000/mercadopago/failure",
          },
      auto_return: 'approved',
      notification_url: 'https://4195-45-189-218-73.ngrok-free.app/payments/webhook',
    };

    try {
      const response = await preference.create({ body: preferenceData });
      return { preferenceId: response.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
