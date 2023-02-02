import { Create } from '@apps/controllers/create-app';
import { Get } from '@apps/controllers/get-app';
import { Update } from '@apps/controllers/update-apps';
import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Router } from 'express';

class AppRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/add-apps', authMiddleware.checkAuthentication, Create.prototype.create);
    this.router.get('/get-apps/:device_id', authMiddleware.checkAuthentication, Get.prototype.read);
    this.router.post('/update-app-status', authMiddleware.checkAuthentication, Update.prototype.updateStatus);

    return this.router;
  }
}

export const appRoutes: AppRoutes = new AppRoutes();
