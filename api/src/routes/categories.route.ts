import { Router } from "express";
import * as CategoriesController from "../controllers/categories.controller";

const route = Router();

route.get('/', CategoriesController.getCategories)
    .get('/:id', CategoriesController.getCategory)
    .post('/', CategoriesController.createCategory)
    .patch('/:id', CategoriesController.updateCategory)
    .delete('/:id', CategoriesController.deleteCategory);


export default route;