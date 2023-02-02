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
      const existingLocation = await Location.findOne({ where: { device_id } });

      if (!existingLocation) {
        const locationData = await Location.create({ id: 452454, device_id, latitude, longitude });
        res.status(HTTP_STATUS.CREATED).json({ data: locationData });
      } else {
        res.status(HTTP_STATUS.OK).json({ data: existingLocation });
      }
    } catch (error) {
      next(error);
    }
  }
}
