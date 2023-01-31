import { authParentRoutes } from '@authparents/routes/authRoutes';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { Application } from 'express';
import { locationRoutes } from '@location/routes/locationRoutes';
import { appRoutes } from '@apps/routes/appRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, authParentRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, appRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, locationRoutes.routes());
  };
  routes();
};
