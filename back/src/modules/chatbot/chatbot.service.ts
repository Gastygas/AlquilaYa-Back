import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  getResponse(option: string): { text: string[]; options?: string[] } {
    switch (option) {
      case 'Ver todas':
        return { text: ['Cabaña ', 'Departamento ', 'Casa ', 'Hotel ', 'Dúplex ',], options: [ 'Volver al Menú'] };
      case 'Todos':
        return { text: ['Los precios dependen de la ubicación y el tipo de propiedad.'], options: ['Volver al Menú'] };
      case 'Ver forma de pago':
        return { text: ['Mercado Pago'], options: [,'Volver al Menú'] };
      case 'Las propiedades pueden tener o no los siguientes items':
        return { text: ['Baño', 'Dormitorio', 'WiFi', 'Mascotas', 'Aire Acondicionado', 'Calefactor', 'Piscina', ' Estacionamiento', 'Gimnasio', 'Catering'], options: [ 'Volver al Menú'] };
      case 'Intrucciones para cancelar una reserva':
        return { text: ['Tienes que ir a la sección de tus reservas y cancelarla.'], options: [ 'Volver al Menú'] };
      case 'Volver al Menú':
        return { text: ['¿En qué puedo ayudarte?'], options: ['Consulta de propiedades', 'Precios de alquileres', '¿Cuáles son las opciones de pago disponibles?'] };
    }
  }
}
