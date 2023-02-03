import { Login } from '@auth/controllers/login';
import { Register } from '@auth/controllers/register';
import { SignOut } from '@auth/controllers/signout';
import express, { Router } from 'express';

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
