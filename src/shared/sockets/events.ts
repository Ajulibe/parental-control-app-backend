import { Server, Socket } from 'socket.io';

export let socketIOPostObject: Server;

export class SocketIOPostHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIOPostObject = io;
  }

  //listener
  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      socket.on('testing-channel', (frontendMessage: string) => {
        console.log(frontendMessage, 'this is the message from the frontend');
        const data = {
          installed_app_name: 'com.mymobile.web',
          app_status: 'active',
          device_id: 'dw134134341341ded'
        };

        this.io.emit('get_app_status_update', data);
      });
    });
  }
}
