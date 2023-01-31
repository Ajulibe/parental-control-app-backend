import { Create } from '@apps/controllers/create-app';
import { Get } from '@apps/controllers/get-app';
import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Router } from 'express';

class AppRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/add-apps', authMiddleware.checkAuthentication, Create.prototype.create);
    this.router.post('/get-apps', authMiddleware.checkAuthentication, Get.prototype.read);

    return this.router;
  }
}

export const appRoutes: AppRoutes = new AppRoutes();
