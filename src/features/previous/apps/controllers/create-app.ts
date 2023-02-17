import { NextFunction, Request, Response } from 'express';

import { Apps } from '@root/features/previous/apps/model/apps.model';
import HTTP_STATUS from 'http-status-codes';
import { appSchema } from '@root/features/previous/apps/schema/app.schema';
import { joiValidation } from '@global/decorators/joi-validation.decorators';

export class Create {
  @joiValidation(appSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = req.body;
    try {
      const createdApps = await Apps.bulkCreate(data, { validate: true });
      res.status(HTTP_STATUS.CREATED).json({ data: createdApps });
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error });
    }
  }
}
