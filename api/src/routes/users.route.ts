import { Router } from "express";
import * as UsersController from "../controllers/users.controller";

const route = Router();

route.get('/', UsersController.getUsers)
    .get('/:id', UsersController.getUser)
    .post('/', UsersController.createUser)
    .patch('/:id', UsersController.updateUser)
    .delete('/:id', UsersController.deleteUser);


export default route;