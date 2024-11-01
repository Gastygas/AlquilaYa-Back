import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { log } from 'console';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';

@WebSocketGateway()
export class WebsocketGateway implements OnModuleInit{
    @WebSocketServer()
    public server: Server;

    constructor(private readonly socketService: WebsocketService) {}
    onModuleInit() {

        this.server.on('connection', (socket: Socket) => {
          
          console.log('socket connected', socket.id);
          
          const { name, token  } = socket.handshake.auth;
          console.log({ name, token });
          
          
          if ( !name ) {
            socket.disconnect();
            return;
          }
          // Agregar cliente al listado
          this.socketService.onClientConnected({id: socket.id, name: name});
          this.server.emit('on-clients-changed', this.socketService.getClients());

          
          //Mensaje de Bienvenida
          // socket.emit('welcome-message', 'Hola ' + name + ' Bienvenido al Servidor');

          //Listado de clientes conectados
          
          socket.broadcast.emit('user-connected', { name });
          socket.on('disconnect', () => {
            this.socketService.onClientDisconnected(socket.id);
            this.server.emit('on-clients-changed', this.socketService.getClients());
          }); 
        });
    
      }
    
      @SubscribeMessage('send-message')
      handleMessage(
        @MessageBody() message: string,
        @ConnectedSocket() client: Socket,
      ) {
        const { name, token } = client.handshake.auth;
    
        if ( !message ) {
          return;
        }
    
        this.server.emit(
          'on-message',
          {
            userId: client.id,
            message: message,
            name: name,
          }
        )
      }


}