import { AuthorisedParent } from '@auth/models/auth.model';
import { IAuthParentPayload } from '@auth/interfaces/auth.interface';
import { Children } from '@root/features/children/model/children.model';
import { NextFunction } from 'express';
import Logger from 'bunyan';
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
