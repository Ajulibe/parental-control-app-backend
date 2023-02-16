import { NextFunction, Request, Response } from 'express';

import { AuthPayload } from '@auth/interfaces/auth.interface';
import JWT from 'jsonwebtoken';
import Logger from 'bunyan';
import { NotAuthorizedError } from '@global/helpers/error-handler';
import { config } from '@root/config';

const log: Logger = config.createLogger('authMiddleWare');
export class AuthMiddleware {
  public verifyUser(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.authorization) {
      throw new NotAuthorizedError('Token is not available. Please login again.');
    }
    try {
      const BearerToken = req.headers?.authorization;
      if (req.headers?.authorization) {
        const payload: AuthPayload = JWT.verify(BearerToken, config.JWT_TOKEN!) as AuthPayload;
        req.currentUser = payload;
      }
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Please login again.');
    }
    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route.');
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
