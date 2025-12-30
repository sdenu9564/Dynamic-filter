import { Router } from 'express';
import HTTPStatus from 'http-status';

import APIError from '../services/error.js';
import logErrorService from '../services/log.js';
import OrderRoutes from './order_routes.js';
import UserRoutes from './user_routes.js';
import ProductRoutes from './product_routes.js';





const routes = new Router();

routes.use('/orders', OrderRoutes);
routes.use('/users', UserRoutes);
routes.use('/products', ProductRoutes);



routes.all('*', (req, res, next) =>
  next(new APIError('Route Not Found!', HTTPStatus.NOT_FOUND, true))
);

routes.use(logErrorService);

export default routes;
