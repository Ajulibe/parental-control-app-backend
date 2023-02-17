import { AuthorisedParent } from '@root/features/previous/auth/models/auth.model';
import { Children } from '@root/features/previous/children/model/children.model';
import { IAuthParentPayload } from '@root/features/previous/auth/interfaces/auth.interface';
import Logger from 'bunyan';
import { NextFunction } from 'express';
import { config } from '@root/config';

const log: Logger = config.createLogger('authParentService');

class AuthParentService {
  public async loginAuthParent(
    data: IAuthParentPayload,
    next: NextFunction
  ): Promise<{ parent: AuthorisedParent | null; child: Children | null }> {
    const { email_address, password, child_name } = data;
    let parent: AuthorisedParent | null = null;
    let child: Children | null = null;
    parent = await AuthorisedParent.findOne({
      where: { email_address, child_name }
    });
    if (!parent) {
      next(new Error('Parent does not exsit'));
    }
    const isPasswordMatch = await parent!.comparePassword(password);
    if (!isPasswordMatch) {
      next(new Error('Incorrect Email or password'));
    }
    try {
      child = await Children.findOne({ where: { child_name, email_address } });
    } catch (error) {
      next(error);
    }
    return { parent, child };
  }
}

export const authParentService: AuthParentService = new AuthParentService();
