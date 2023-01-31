import { NextFunction, Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { appSchema } from '@apps/schema/app.schema';
import { Apps } from '@apps/model/apps.model';

export class Create {
  @joiValidation(appSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { device_id, installed_app_name, app_status } = req.body;
    try {
      const [app_data, created] = await Apps.findOrCreate({
        where: { device_id },
        defaults: { device_id, installed_app_name, app_status }
      });

      if (created) {
        res.status(HTTP_STATUS.CREATED).json({ data: app_data });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ data: [] });
      }
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error });
    }
  }
}
