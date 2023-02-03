import { NextFunction, Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { registerSchema } from '@auth/schema/register.schema';
import { AuthorisedParent } from '@auth/models/auth.model';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { Children } from '@root/features/children/model/children.model';
import { IAuthParentPayload } from '@auth/interfaces/auth.interface';
import { Transaction } from 'sequelize';
import { connection } from '@root/setupDatabase';

export class Register {
  @joiValidation(registerSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email_address, password, child_name, device_id } = req.body;

    //cannot use gcognito cause our email address field is not uniquw.
    //its best we manage it our self
    //  const cognitoService = new Cognito();
    //  cognitoService.signUp(email_address, password).then((success) => {
    //    console.log('success', success);
    //  });

    try {
      ///create a transaction
      await connection.transaction(async (transaction: Transaction) => {
        // Check if the email address is already registered
        const [user, created] = await AuthorisedParent.findOrCreate({
          where: { email_address, child_name },
          defaults: { email_address, password, child_name },
          transaction
        });

        // Add to the children database
        if (created) {
          await Children.create({ device_id, child_name, email_address }, { transaction });

          // Generate a token for the user
          const userJwt = Register.prototype.signToken({ email_address, password, child_name });
          res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user, token: userJwt });
        } else {
          res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Unable to create user' });
        }
      });
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
