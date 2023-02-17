import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';
import { IAuthParentPayload } from '@root/features/previous/auth/interfaces/auth.interface';
import JWT from 'jsonwebtoken';
import { authParentService } from '@service/db/authparent.service';
import { config } from '@root/config';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { loginSchema } from '@root/features/previous/auth/schema/login.schema';

export class Login {
  @joiValidation(loginSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { parent, child } = await authParentService.loginAuthParent(req.body, next);
      // const userJwt: string = Login.prototype.signToken({ ...req.body });
      // req.session = { jwt: "userJwt" };
      // res.status(HTTP_STATUS.OK).json({ message: 'Successfully Logged in', data: [{ parent, child }], token: userJwt });
    } catch (error) {
      next(error);
    }
  }

  private signToken(data: IAuthParentPayload): string {
    return JWT.sign(
      {
        email_address: data.email_address,
        child_name: data.child_name,
        password: data.password
      },
      config.JWT_TOKEN!
    );
  }

  public async testing(req: Request, res: Response): Promise<void> {
    try {
      res.status(HTTP_STATUS.CREATED).json({ data: { working: true, message: 'server is working' } });
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error });
    }
  }
}
