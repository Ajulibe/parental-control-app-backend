import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';
import { MovieRating } from '@root/features/rating/model/rating.model';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { ratingSchema } from '@root/features/rating/schema/rating.schema';

export class Update {
  @joiValidation(ratingSchema)
  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id, movie_id, rating } = req.body;
    try {
      const [rowsUpdated, [updatedRating]] = await MovieRating.update(
        { rating },
        {
          where: { user_id, movie_id },
          returning: true
        }
      );
      if (rowsUpdated > 0) {
        res.status(HTTP_STATUS.OK).json({ message: 'Successfully updated', data: updatedRating });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Rating not found' });
      }
    } catch (error) {
      next(error);
    }
  }
}
