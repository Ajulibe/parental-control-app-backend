import { NextFunction, Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { loginSchema } from '@auth/schemas/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { userService } from '@service/db/user.service';
import { IUserDocument } from '@user/interfaces/user.interface';

export class RefreshToken {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.currentUser, 'at refresh');
    let currentUser = req.currentUser;
    const userJwt: string = JWT.sign(
      {
        userId: currentUser?.userId,
        uId: currentUser?.uId,
        email: currentUser?.email,
        username: currentUser?.username,
        avatarColor: currentUser?.avatarColor
      },
      config.JWT_TOKEN!,
      { expiresIn: config.TOKEN_EXPIRY }
    );
    res.setHeader('Set-Cookie', userJwt);
  }
}
