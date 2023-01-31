import { Request, Response } from 'express';
import { UserCache } from '@service/redis/user.cache';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import HTTP_STATUS from 'http-status-codes';
import { Helpers } from '@global/helpers/helpers';

const userCache: UserCache = new UserCache();

/**
 *
 * THe aim of this file is to retreive information about the current user.
 * if the user is stored in the cache, then it takes that user, else, it goes
 * to the database to retreive the user. Remember, the cahce is faster than the
 * normal database
 *
 */

export class CurrentUser {
  public async read(req: Request, res: Response): Promise<void> {
    let isUser = false;
    let token = null;
    let user = null;
    const cachedUser: IUserDocument = (await userCache.getUserFromCache(`${req.currentUser!.userId}`)) as IUserDocument;
    const existingUser: IUserDocument = cachedUser ? cachedUser : await userService.getUserById(`${req.currentUser!.userId}`);
    if (Object.keys(existingUser).length) {
      isUser = true;
      token = req.session?.jwt;
      // token = Helpers.getTokenFromHeader(req);
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ isUser, user, token });
  }
}
