import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';
import { MovieRating } from '@root/features/rating/model/rating.model';

export class Get {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { movie_id } = req.params;
    try {
      const ratings = await MovieRating.findAll({ where: { movie_id } });
      const ratingsCount = ratings.length;
      const ratingsSum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
      const averageRating = ratingsSum / ratingsCount;

      if (ratingsCount > 0) {
        res.status(HTTP_STATUS.OK).json({ data: { ratings, averageRating } });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ data: { ratings: [], averageRating: null } });
      }
    } catch (error) {
      next(error);
    }
  }
}
