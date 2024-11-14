import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  getResponse(option: string): { text: string; options?: string[] } {
    switch (option) {
      case 'Ver todas':
        return { text: '', options: ['Cabaña', 'Departamento', 'Casa', 'Hotel', 'Dúplex', 'Volver al Menú'] };
      case 'Todos':
        return { text: 'Los precios dependen de la ubicación y el tipo de propiedad.', options: ['Volver al Menú'] };
      case 'Ver forma de pago':
        return { text: '', options: ['Mercado Pago','Volver al Menú'] };
      case 'Ver opciones de propiedades':
        return { text: '', options: ['Baño', 'Dormitorio', 'WiFi', 'Mascotas', 'Aire Acondicionado', 'Calefactor', 'Piscina', ' Estacionamiento', 'Volver al Menú'] };
      case 'Volver al Menú':
        return { text: '¿En qué puedo ayudarte?', options: ['Consulta de propiedades', 'Precios de alquileres', '¿Cuáles son las opciones de pago disponibles?'] };
    }
  }
}
