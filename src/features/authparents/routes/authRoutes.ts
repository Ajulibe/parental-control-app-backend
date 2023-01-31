import { Login } from '@authparents/controllers/login';
import { Register } from '@authparents/controllers/register';
import express, { Router } from 'express';

class AuthParentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/register', Register.prototype.create);
    this.router.post('/auth-login', Login.prototype.create);
    return this.router;
  }
}

export const authParentRoutes: AuthParentRoutes = new AuthParentRoutes();
