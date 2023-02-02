import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { Location } from '@root/features/location/model/location.model';

export class Get {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { device_id } = req.params;
    try {
      const location_data = await Location.findOne({
        where: { device_id }
      });

      if (location_data) {
        res.status(HTTP_STATUS.OK).json({ data: location_data });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ data: [] });
      }
    } catch (error) {
      next(error);
    }
  }
}
