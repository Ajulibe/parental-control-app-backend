import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';
import { MovieRating } from '@root/features/rating/model/rating.model';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { ratingSchema } from '@root/features/rating/schema/rating.schema';

export class Create {
  @joiValidation(ratingSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id, movie_id, rating } = req.body;
    try {
      const existingRating = await MovieRating.findOne({ where: { user_id, movie_id } });

      if (!existingRating) {
        const ratingData = await MovieRating.create({ user_id, movie_id, rating });
        res.status(HTTP_STATUS.CREATED).json({ data: ratingData });
      } else {
        res.status(HTTP_STATUS.OK).json({ data: existingRating });
      }
    } catch (error) {
      next(error);
    }
  }
}
