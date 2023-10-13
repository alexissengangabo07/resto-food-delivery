import { Router } from "express";
import * as FoodsController from "../controllers/foods.controller";

const route = Router();

route.get('/', FoodsController.getFoods)
    .get('/:id', FoodsController.getFood)
    .post('/', FoodsController.createFood)
    .patch('/:id', FoodsController.updateFood)
    .delete('/:id', FoodsController.deleteFood);


export default route;