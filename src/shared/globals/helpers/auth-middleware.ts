import { NextFunction, Request, Response } from 'express';

import Logger from 'bunyan';
import { NotAuthorizedError } from '@global/helpers/error-handler';
import OktaJwtVerifier from '@okta/jwt-verifier';
import { config } from '@root/config';

const log: Logger = config.createLogger('authMiddleWare');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: config.OKTA_ISSUER
});
export class AuthMiddleware {
  public verifyOktaUser(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.authorization) {
      next(new NotAuthorizedError('Token is not available. Please login again.'));
    }
    try {
      const BearerToken = req.headers?.authorization;
      const bearer = BearerToken!.split(' ');
      const accessToken = bearer[1];
      if (req.headers?.authorization) {
        oktaJwtVerifier
          .verifyAccessToken(accessToken!, 'api://default')
          .then((jwt) => console.log('token is valid'))
          .catch((err) => {
            next(new NotAuthorizedError('Token is invalid in Okta. Please login again.'));
          });
      }
    } catch (error) {
      next(new NotAuthorizedError('Okta Token is invalid. Please login again.'));
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
