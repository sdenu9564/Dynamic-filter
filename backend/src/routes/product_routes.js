import { Router } from "express";
import * as ProductController from '../controllers/product.controller.js';



const routes = new Router();

routes.get(
    '/',
    ProductController.getAllProduct
)

export default routes;