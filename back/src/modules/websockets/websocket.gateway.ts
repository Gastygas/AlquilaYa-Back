import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { log } from 'console';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
    @SubscribeMessage('mensaje')
    handleMessage(@MessageBody() data: string) {
        console.log(data);
        this.server.emit('mensajeserver', "Texto recibido desde el servidor");
    }

    @SubscribeMessage('login')
    loginUser(@MessageBody() data: string) {
        console.log(data);
        this.server.emit('login', "Login exitoso");
    }
}