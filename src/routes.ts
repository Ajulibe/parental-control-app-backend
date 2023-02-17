import { Application } from 'express';
import { authParentRoutes } from '@root/features/previous/auth/routes/authRoutes';
import { ratingRoutes } from '@rating/routes/ratingRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, ratingRoutes.routes());
    app.use(BASE_PATH, authParentRoutes.routes());
  };
  routes();
};
