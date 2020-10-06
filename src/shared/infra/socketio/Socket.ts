import { Server } from 'socket.io';
import socketioJwt from 'socketio-jwt';

interface INotification {
  title: string;
  message: string;
  type: 'information' | 'sucess' | 'error';
}

class Socket {
  private socket: Server;

  private static instance: Socket;

  private constructor() {
    console.log('🚀 Socket launched');
  }

  public static getInstance(): Socket {
    if (!this.instance) {
      this.instance = new Socket();
    }
    return this.instance;
  }

  public registerSocket(socket: Server): void {
    this.socket = socket;

    this.configureSocket();
  }

  private configureSocket(): void {
    // this.socket.origins('http://localhost:3000');
    this.socket.origins('*:*');

    this.socket.sockets.on(
      'connection',
      socketioJwt.authorize({
        secret: String(process.env.SECRET),
        timeout: 15000,
      }),
    );

    this.socket.sockets.on('authenticated', (socket: any) => {
      console.log(socket.decoded_token);
    });
  }

  public async sendNotification({
    title,
    message,
    type,
  }: INotification): Promise<void> {
    this.socket.sockets.emit('notification', {
      title,
      message,
      type,
    });
  }
}

export default Socket;
