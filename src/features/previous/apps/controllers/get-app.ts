import { NextFunction, Request, Response } from 'express';

import { Apps } from '@root/features/previous/apps/model/apps.model';
import HTTP_STATUS from 'http-status-codes';

export class Get {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { device_id } = req.params;
    try {
      const apps_data = await Apps.findAll({
        where: { device_id }
      });

      if (apps_data) {
        res.status(HTTP_STATUS.OK).json({ data: apps_data });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ data: [] });
      }
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error });
    }
  }
}
