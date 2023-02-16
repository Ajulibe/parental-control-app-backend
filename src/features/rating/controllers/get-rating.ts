import { IMovieRating, MovieRating } from '@root/features/rating/model/rating.model';
import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';

export class Get {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { movie_id } = req.params;
    try {
      const ratings: IMovieRating[] = await MovieRating.find({ movie_id });
      const ratingsCount: number = ratings.length;

      if (ratingsCount < 1) return;

      const ratingsSum: number = ratings.reduce((acc, rating) => acc + rating.rating, 0);
      const averageRating: number | null = ratingsCount > 0 ? ratingsSum / ratingsCount : null;

      if (ratingsCount > 0) {
        res.status(HTTP_STATUS.OK).json({ data: { ratings, averageRating } });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ data: { ratings: [], averageRating } });
      }
    } catch (error) {
      next(error);
    }
  }
}
