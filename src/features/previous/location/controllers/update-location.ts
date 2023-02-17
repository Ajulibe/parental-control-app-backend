import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';
import { Location } from '@root/features/previous/location/model/location.model';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { locationSchema } from '../schema/location.schema';

export class Update {
  @joiValidation(locationSchema)
  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { device_id, latitude, longitude } = req.body;
    try {
      await Location.update(
        { latitude, longitude },
        {
          where: { device_id }
        }
      );
      const updated_location = await Location.findOne({ where: { device_id } });
      res.status(HTTP_STATUS.OK).json({ message: 'Sucessfully Updated', data: updated_location });
    } catch (error) {
      next(error);
    }
  }
}
