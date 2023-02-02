import { Login } from '@authparents/controllers/login';
import { Register } from '@authparents/controllers/register';
import { SignOut } from '@authparents/controllers/signout';
import express, { Router } from 'express';

class AuthParentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/register', Register.prototype.create);
    this.router.post('/login', Login.prototype.create);
    this.router.post('/test', Login.prototype.testing);
    this.router.post('/signout', SignOut.prototype.update);
    return this.router;
  }
}

export const authParentRoutes: AuthParentRoutes = new AuthParentRoutes();
