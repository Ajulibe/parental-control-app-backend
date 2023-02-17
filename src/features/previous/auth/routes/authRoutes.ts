import express, { Router } from 'express';

import { Login } from '@root/features/previous/auth/controllers/login';
import { Register } from '@root/features/previous/auth/controllers/register';
import { SignOut } from '@root/features/previous/auth/controllers/signout';

class AuthParentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/register', Register.prototype.create);
    this.router.post('/login', Login.prototype.create);
    this.router.get('/testing', Login.prototype.testing);
    this.router.post('/signout', SignOut.prototype.update);
    return this.router;
  }
}

export const authParentRoutes: AuthParentRoutes = new AuthParentRoutes();
