import express, { Router } from 'express';

import { Create } from '@root/features/previous/location/controllers/create-location';
import { Get } from '@root/features/previous/location/controllers/get-location';
import { Update } from '@root/features/previous/location/controllers/update-location';
import { authMiddleware } from '@global/helpers/auth-middleware';

class LocationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/create-location', authMiddleware.checkAuthentication, Create.prototype.create);
    this.router.get('/get-location/:device_id', authMiddleware.checkAuthentication, Get.prototype.read);
    this.router.post('/update-location', authMiddleware.checkAuthentication, Update.prototype.update);
    return this.router;
  }
}

export const locationRoutes: LocationRoutes = new LocationRoutes();
