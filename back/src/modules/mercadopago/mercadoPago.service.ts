import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { preference } from 'src/config/mercadopago';
import { Property } from 'src/entities/property.entity';

@Injectable()
export class MercadoPagoService {
  constructor() {}

  async createPreference(body: any) {
    
    const preferenceData = {
        items: body.items.map(item  => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),

        back_urls: {
            success: "https://localhost:3000/mercadopago/succes",
            failure: "https://localhost:3000/mercadopago/failure",
          },
      auto_return: 'approved',
    };

    try {
      const response = await preference.create({ body: preferenceData });
      return { preferenceId: response.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
