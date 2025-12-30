import { Router } from "express";
import * as UserController from '../controllers/user.controller.js';



const routes = new Router();

routes.get(
    '/',
    UserController.getAllUser
)

export default routes;