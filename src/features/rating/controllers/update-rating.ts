import { IMovieRating, MovieRating } from '@root/features/rating/model/rating.model';
import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { ratingSchema } from '@root/features/rating/schema/rating.schema';

export class Update {
  @joiValidation(ratingSchema)
  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id, movie_id, rating } = req.body;
    try {
      const filter = { user_id, movie_id };
      const update = { rating };
      const options = { new: true };
      const updatedRating: IMovieRating | null = await MovieRating.findOneAndUpdate(filter, update, options);

      if (updatedRating) {
        res.status(HTTP_STATUS.OK).json({ message: 'Successfully updated', data: updatedRating });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Rating not found' });
      }
    } catch (error) {
      next(error);
    }
  }
}
