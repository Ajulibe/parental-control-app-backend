import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { Apps } from '@apps/model/apps.model';

export class Get {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { device_id } = req.body;
    try {
      const location_data = await Apps.findOne({
        where: { device_id }
      });

      if (location_data) {
        res.status(HTTP_STATUS.OK).json({ data: location_data });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ data: [] });
      }
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error });
    }
  }
}
