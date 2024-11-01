import { Injectable } from "@nestjs/common";

interface Client {
    id: string;
    name: string;
  }


@Injectable()
export class WebsocketService {
    private clients: Record<string, Client> = {};

  onClientConnected( client: Client ) {
    this.clients[ client.id ] = client;
    console.log('Cliente conectado:', this.clients);
  }

  onClientDisconnected( id: string ) {
    delete this.clients[id];
    console.log('Cliente desconectado:', this.clients);
  }

  
  getClients() {
    console.log('Clientes actuales:', this.clients);
    return Object.values( this.clients ); 
  }


}