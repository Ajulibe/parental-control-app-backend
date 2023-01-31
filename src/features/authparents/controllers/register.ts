import { NextFunction, Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { registerSchema } from '@authparents/schema/register.schema';
import { AuthorisedParent } from '@authparents/models/auth.model';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import Children from '@root/features/children/model/children.model';
import { IAuthParentPayload } from '@authparents/interfaces/auth.interface';

export class Register {
  @joiValidation(registerSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email_address, password, child_name, device_id } = req.body;
    try {
      //check if email address is already registered
      const [user, created] = await AuthorisedParent.findOrCreate({
        where: { email_address },
        defaults: {
          email_address,
          password,
          child_name
        }
      });
      //generate token for user
      const userJwt: string = Register.prototype.signToken({ email_address, password, child_name });
      if (created) {
        //add to children database
        Children.create({ device_id, child_name, email_address }).then(() => {
          res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user, token: userJwt });
        });
      } else {
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
