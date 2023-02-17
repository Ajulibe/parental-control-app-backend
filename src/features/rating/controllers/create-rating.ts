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
      // Make a POST request to the Java rating controller's API endpoint to create the rating
      await axios.post(`${config.JAVA_SERVER_BASER_URL}/rate-movie`, {
        id: movie_id,
        rating: rating
      });
      // If the request is successful
      MovieRating.create({ user_id, movie_id, rating });
      res.status(HTTP_STATUS.CREATED).json({ message: 'Rated Succesfully!' });
    } catch (error) {
      next(error);
    }
  }
}
