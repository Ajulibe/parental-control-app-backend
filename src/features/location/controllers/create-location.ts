import { NextFunction, Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { Location } from '@root/features/location/model/location.model';
import { locationSchema } from '../schema/location.schema';

export class Create {
  @joiValidation(locationSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { device_id, latitude, longitude } = req.body;
    try {
      const [location_data, created] = await Location.findOrCreate({
        where: { device_id },
        defaults: { device_id, latitude, longitude }
      });

      if (created) {
        res.status(HTTP_STATUS.CREATED).json({ data: location_data });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ data: [] });
      }
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error });
    }
  }
}
