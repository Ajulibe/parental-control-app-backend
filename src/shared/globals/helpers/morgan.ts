import morgan from 'morgan';
import { Response, Request } from 'express';
import Logger from 'bunyan';
import { config } from '@root/config';

const log: Logger = config.createLogger('morgan Looger');

morgan.token('message', (_req: Request, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () => (config.NODE_ENV === 'production' ? ':remote-addr - ' : '');

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message) => log.info(message.trim()) }
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message) => log.error(message.trim()) }
});

const handlers = {
  successHandler,
  errorHandler
};

export default handlers;
