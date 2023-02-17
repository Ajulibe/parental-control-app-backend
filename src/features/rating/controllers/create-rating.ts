import { IMovieRating, MovieRating } from '@root/features/rating/model/rating.model';
import { NextFunction, Request, Response } from 'express';

import HTTP_STATUS from 'http-status-codes';
import axios from 'axios';
import { config } from '@root/config';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { ratingSchema } from '@root/features/rating/schema/rating.schema';

export class Create {
  @joiValidation(ratingSchema)
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id, movie_id, rating } = req.body;
    try {
      const existingRating = await MovieRating.findOne({ user_id, movie_id });
      if (!existingRating) {
        // Make a POST request to the Java rating controller's API endpoint to create the rating
        await axios.post(config.JAVA_SERVER_BASER_URL, {
          movie_id,
          rating
        });

        // If the request is successful
        res.status(HTTP_STATUS.CREATED).json({ message: 'Rated Succesfully!' });
      } else {
        res.status(HTTP_STATUS.OK).json({ message: 'Rating already exists' });
      }
    } catch (error) {
      next(error);
    }
  }
}
