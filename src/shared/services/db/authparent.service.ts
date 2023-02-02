import { AuthorisedParent } from '@authparents/models/auth.model';
import { IAuthParentPayload } from '@authparents/interfaces/auth.interface';
import { Children } from '@root/features/children/model/children.model';
import { NextFunction } from 'express';

class AuthParentService {
  public async loginAuthParent(
    data: IAuthParentPayload,
    next: NextFunction
  ): Promise<{ parent: AuthorisedParent | null; child: Children | null }> {
    const { email_address, password, child_name } = data;

    let parent: AuthorisedParent | null = null;
    let child: Children | null = null;

    parent = await AuthorisedParent.findOne({
      where: { email_address, password }
    });

    if (!parent) {
      next(new Error('Parent not found'));
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
