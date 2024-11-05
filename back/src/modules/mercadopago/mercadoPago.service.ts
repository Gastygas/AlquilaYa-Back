import { Injectable } from '@nestjs/common';
import { preference } from 'src/config/mercadopago';
import { config as dotenvConfig } from 'dotenv';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';

dotenvConfig({ path: '.env' });

@Injectable()
export class MercadoPagoService {
  async createPreference(body: any) {
    const preferenceData = {
      items: body.items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
      back_urls: {
        success: 'http://localhost:3001/mercadopago/success',
        failure: 'http://localhost:3001/mercadopago/failure',
      },
      auto_return: 'approved',
      external_reference: body.newBooking,
    };

    try {
      const response = await preference.create({ body: preferenceData });
      return { preferenceId: response.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPaymentDetails(paymentId: string) {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      },
    );

    return response.json();
  }

  async destructure(url) {
    // Obtener la parte de parámetros de la URL
    const queryParams = url.split('?')[1].split('&');

    // Variables para almacenar los valores
    let paymentId = '';
    let externalReference = '';

    // Iterar sobre cada parámetro
    queryParams.forEach((param) => {
      const [key, value] = param.split('=');

      // Verificar y asignar los valores deseados
      if (key === 'payment_id') {
        paymentId = value;
      } else if (key === 'external_reference') {
        // Decodificar el valor para obtener el JSON original
        const decodedValue = decodeURIComponent(value);
        externalReference = decodedValue;
      }
    });

    // Convertir externalReference a objeto JSON
    let bookingData;
    try {
      bookingData = JSON.parse(externalReference);
    } catch (error) {
      console.error('Error parsing external reference:', error);
    }

    
    // console.log('Payment ID:', paymentId);
    // console.log('External Reference:', externalReference);
    // console.log('External Reference Object:', bookingData.booking.propertyId);

    return { paymentId, bookingData };
  }
}
