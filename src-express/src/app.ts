import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

class App {
  private app: express.Application;
  private httpServer: http.Server;
  private io: Server;

  room = [
    { id: 0, title: 'main', status: false }, 
    { id: 1, title: '3학년 경보기', status: false }, 
    { id: 2, title: '2학년 경보기', status: false },
    { id: 3, title: '1학년 경보기', status: false }
  ];

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.setupMiddleware();
    this.setupRoutes();
    this.setupSocket();
    this.start();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send('Hello World!');
    });
  }

  private setupSocket(): void {
    this.io.on('connection', (socket) => {
      socket.on('disconnect', () => {
        return;
      });

      socket.on('warning', (arr) => {
        this.room[arr] = { ...this.room[arr], status: true };
        setTimeout(() => {
          this.room[arr] = { ...this.room[arr], status: false };
        }, 350)

        this.io.emit('warning', arr);
      });

      socket.on('room', () => {
        this.io.emit('room', { room: this.room })
        return
      })

      socket.on('check', (arr) => {
        this.io.emit('warning', { warning: this.room[arr] });
        return
      })

    });
  }

  private start(): void {
    this.httpServer.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  }
}

new App();
