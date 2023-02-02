import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';
import Logger from 'bunyan';
import { Server } from 'socket.io';
import { createClient } from 'redis';
// import { createAdapter } from '@socket.io/redis-adapter';
import applicationRoutes from '@root/routes';
import { CustomError, IErrorResponse } from '@global/helpers/error-handler';
import morgan from '@global/helpers/morgan';
import { SocketIOPostHandler } from '@socket/events';

const SERVER_PORT = 3000;
const log: Logger = config.createLogger('server');

export class ChattyServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.apiMonitoring(this.app);
    this.startServer(this.app);
    this.globalErrorHandler(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        sameSite: 'none' // comment this line when running the server locally
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private routesMiddleware(app: Application): void {
    //logging for routes
    if (config.NODE_ENV !== 'test') {
      app.use(morgan.successHandler);
      app.use(morgan.errorHandler);
    }

    applicationRoutes(app);
  }

  private apiMonitoring(app: Application): void {}

  /*=============================================
  =         Global Error middleware            =
  =============================================*/
  private globalErrorHandler(app: Application): void {
    /* catching url requests that dont exist */
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    /* catching more genral errors */
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }

      res.status(HTTP_STATUS.BAD_REQUEST).send({
        status: 'BAD_REQUEST',
        message: error.message ?? 'Something went wrong.',
        statusCode: HTTP_STATUS.BAD_REQUEST
      });
    });
  }

  /*=============================================
 =            Server setup            =
 =============================================*/
  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      socketIO.on('connection', (socket) => {
        console.log(socket, 'a user connected');
      });
      this.startHttpServer(httpServer);
      this.socketIOConnections(socketIO);
    } catch (error) {
      log.error(error);
    }
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    log.info(`Server has started with process ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server running on port ${SERVER_PORT}`);
    });
  }

  /*=============================================
 =            Socket.io setup            =
 =============================================*/

  //this is a type of server but its a socket server that communicates with
  //redis
  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });
    // const pubClient = createClient({ url: config.REDIS_HOST });
    // const subClient = pubClient.duplicate();
    // await Promise.all([pubClient.connect(), subClient.connect()]);
    // io.adapter(createAdapter(pubClient, subClient));
    return io;
  }

  private socketIOConnections(io: Server): void {
    const postSocketHandler: SocketIOPostHandler = new SocketIOPostHandler(io);
    postSocketHandler.listen();
  }
}
