import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { loginSchema } from '@authparents/schema/login.schema';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';
import { IAuthParentPayload } from '@authparents/interfaces/auth.interface';
import { authParentService } from '@service/db/authparent.service';

export class Login {
  @joiValidation(loginSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { parent, child } = await authParentService.loginAuthParent(req.body, next);
      const userJwt: string = Login.prototype.signToken({ ...req.body });
      req.session = { jwt: userJwt };
      res.status(HTTP_STATUS.OK).json({ message: 'Successfully Logged in', data: [parent, child], token: userJwt });
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
}
