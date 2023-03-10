import express, { Express } from 'express';
import { MainServer } from '@root/setupServer';
import databaseConnection from '@root/setupDatabase';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('app');

class Application {
  public loadConfig(): void {
    config.validateConfig();
  }

  public handleExit(): void {
    process.on('uncaughtException', (error: Error) => {
      log.error(`There was an uncaught error: ${error}`);
      Application.shutDownProperly(1);
    });

    process.on('unhandleRejection', (reason: Error) => {
      log.error(`Unhandled rejection at promise: ${reason}`);
      Application.shutDownProperly(2);
    });

    process.on('SIGTERM', () => {
      log.error('Caught SIGTERM');
      Application.shutDownProperly(2);
    });

    process.on('SIGINT', () => {
      log.error('Caught SIGINT');
      Application.shutDownProperly(2);
    });

    process.on('exit', () => {
      log.error('Exiting');
    });
  }

  private static shutDownProperly(exitCode: number): void {
    Promise.resolve()
      .then(() => {
        log.info('Shutdown complete');
        process.exit(exitCode);
      })
      .catch((error) => {
        log.error(`Error during shutdown: ${error}`);
        process.exit(1);
      });
  }
}

/*=============================================
=           initialize():              =
=============================================*/
const app: Express = express();
const application: Application = new Application();
application.loadConfig();
databaseConnection();
application.handleExit();

const server: MainServer = new MainServer(app);
server.start();

// for aws lamda function
export { app };
