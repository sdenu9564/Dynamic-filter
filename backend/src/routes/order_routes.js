import { Router } from "express";
import * as OrderController from '../controllers/order.controller.js';



const routes = new Router();

routes.get(
    '/filters', 
    OrderController.getFilters
);
routes.post(
    '/search',
    OrderController.searchOrders
);

export default routes;