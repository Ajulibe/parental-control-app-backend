import express, { Router } from 'express';

import { Create } from '@rating/controllers/create-rating';
import { Get } from '@rating/controllers/get-rating';
import { Update } from '@rating/controllers/update-rating';
import { authMiddleware } from '@global/helpers/auth-middleware';

class RatingRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/create-rating', authMiddleware.verifyOktaUser, Create.prototype.create);
    this.router.get('/get-rating/:movie_id', authMiddleware.verifyOktaUser, Get.prototype.read);
    this.router.post('/update-rating', authMiddleware.verifyOktaUser, Update.prototype.update);
    return this.router;
  }
}

export const ratingRoutes: RatingRoutes = new RatingRoutes();
