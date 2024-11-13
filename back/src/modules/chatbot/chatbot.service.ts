import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  getResponse(option: string): { text: string; options?: string[] } {
    switch (option) {
      case 'Ver todas':
        return { text: '', options: ['Cabaña', 'Departamento', 'Casa', 'Hotel', 'Dúplex', 'Volver al Menú'] };
      case 'Todos':
        return { text: 'Los precios dependen de la ubicación y el tipo de propiedad.', options: ['Volver al Menú'] };
      case 'pago':
        return { text: 'Puedes pagar con tarjeta, transferencia bancaria o efectivo.', options: ['Volver al Menú'] };
      case 'Volver al Menú':
        return { text: '¿En qué puedo ayudarte?', options: ['Consulta de propiedades', 'Precios', 'Formas de pago'] };
    }
  }
}
