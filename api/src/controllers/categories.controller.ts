import { RequestHandler } from "express";
import mongoose from "mongoose";
import categoriesModel from "../models/categories.model";

export const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const categories = await categoriesModel.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}


export const getCategory: RequestHandler = async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: 'Invalid categorie id' });
        }

        const category = await categoriesModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

interface CreateCategoryBody {
    title: string
}

export const createCategory: RequestHandler<unknown, unknown, CreateCategoryBody, unknown> = async (req, res, next) => {
    const { title } = req.body;

    try {
        const categories = await categoriesModel.create({
            title
        });
        res.status(201).json(categories);
    } catch (error) {
        next(error);
    }
}

interface UpdateCategoryBody {
    title: string
}

interface UpdateCategoryParams {
    id: string
}

export const updateCategory: RequestHandler<UpdateCategoryParams, unknown, UpdateCategoryBody, unknown> = async (req, res, next) => {
    const { title } = req.body;
    const categoryId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: 'Invalid category id' });
        }

        const category = await categoriesModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        let updatedCategory = await categoriesModel.findByIdAndUpdate(categoryId, req.body, { new: true });
        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error);
    }
}

export const deleteCategory: RequestHandler = async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: 'Invalid category id' });
        }

        const category = await categoriesModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await categoriesModel.findByIdAndDelete(categoryId);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}