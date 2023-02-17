import { NextFunction, Request, Response } from 'express';

import { Apps } from '@root/features/previous/apps/model/apps.model';
import HTTP_STATUS from 'http-status-codes';
import { appSchema } from '@root/features/previous/apps/schema/app.schema';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { socketIOPostObject } from '@socket/events';

export class Update {
  @joiValidation(appSchema)
  public async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { device_id, installed_app_name, app_status } = req.body;

    try {
      await Apps.update(
        { app_status },
        {
          where: { device_id, installed_app_name }
        }
      );
      const updated_app_data = await Apps.findOne({ where: { device_id, installed_app_name } });
      res.status(HTTP_STATUS.OK).json({ message: 'Sucessfully Updated', data: updated_app_data });
      //send data to the android app //commented out cause of lambda
      // socketIOPostObject.emit('get_live_locations', updated_app_data);
    } catch (error) {
      next(error);
    }
  }
}
