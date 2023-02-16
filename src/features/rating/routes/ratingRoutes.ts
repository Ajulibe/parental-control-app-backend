import express, { Router } from 'express';

import { Create } from '@rating/controllers/create-rating';
import { Get } from '@rating/controllers/get-rating';
import { Update } from '@rating/controllers/update-rating';
import { oktaMiddleware } from '@global/helpers/okta-middleware';

class RatingRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/create-rating', oktaMiddleware, Create.prototype.create);
    this.router.get('/get-rating', oktaMiddleware, Get.prototype.read);
    this.router.post('/update-rating', oktaMiddleware, Update.prototype.update);
    return this.router;
  }
}

export const locationRoutes: RatingRoutes = new RatingRoutes();
