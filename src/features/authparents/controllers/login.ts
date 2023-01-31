import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { loginSchema } from '@authparents/schema/login.schema';
import { AuthorisedParent } from '@authparents/models/auth.model';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';
import Children from '@root/features/children/model/children.model';
import { IAuthParentPayload } from '@authparents/interfaces/auth.interface';

export class Login {
  @joiValidation(loginSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email_address, password, child_name } = req.body;
    try {
      //check if email address is already registered
      const parent = await AuthorisedParent.findOne({
        where: { email_address, password }
      });

      if (parent) {
        //get the child
        Children.findOne({ where: { child_name, email_address } }).then((child) => {
          //generate token for user
          const userJwt: string = Login.prototype.signToken({ ...req.body });
          res.status(HTTP_STATUS.OK).json({ message: 'Successfully Logged in', user: parent, child, token: userJwt });
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Parent Not Found' });
      }
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error });
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
