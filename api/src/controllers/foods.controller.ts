import { RequestHandler } from "express";
import mongoose from "mongoose";
import foodsModel from "../models/foods.model";

export const getFoods: RequestHandler = async (req, res, next) => {
    try {
        const foods = await foodsModel.find().populate('categoryId');
        res.status(200).json(foods);
    } catch (error) {
        next(error);
    }
}


export const getFood: RequestHandler = async (req, res, next) => {
    const foodId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(foodId)) {
            return res.status(400).json({ message: 'Invalid food id' });
        }

        const food = await foodsModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'Foosd not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        next(error);
    }
}

interface CreateFoodBody {
    title: string,
    description?: string,
    categoryId: string
}

export const createFood: RequestHandler<unknown, unknown, CreateFoodBody, unknown> = async (req, res, next) => {
    const { title, description, categoryId } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ message: 'title is required' });
        }
        if (!categoryId) {
            return res.status(400).json({ message: 'categoryId is required' });
        }

        const foods = await foodsModel.create({
            title, description, categoryId
        });
        res.status(201).json(foods);
    } catch (error) {
        next(error);
    }
}

interface UpdateFoodBody {
    title?: string,
    description?: string,
    categoryId?: string
}

interface UpdateFoodParams {
    id: string
}

export const updateFood: RequestHandler<UpdateFoodParams, unknown, UpdateFoodBody, unknown> = async (req, res, next) => {
    const { title, description, categoryId } = req.body;
    const foodId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(foodId)) {
            return res.status(400).json({ message: 'Invalid food id' });
        }

        const food = await foodsModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        if (!title) {
            return res.status(400).json({ message: 'Food name is required' });
        }

        let updatedFood = await foodsModel.findByIdAndUpdate(foodId, req.body, { new: true });
        res.status(200).json(updatedFood);
    } catch (error) {
        next(error);
    }
}

export const deleteFood: RequestHandler = async (req, res, next) => {
    const foodId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(foodId)) {
            return res.status(400).json({ message: 'Invalid food id' });
        }

        const food = await foodsModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'food not found' });
        }

        await foodsModel.findByIdAndDelete(foodId);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}