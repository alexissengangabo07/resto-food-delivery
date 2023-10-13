import { RequestHandler } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import categoriesModel from "../models/categories.model";

export const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const categories = await categoriesModel.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}


export const getUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

interface CreateUserBody {
    username: string,
    email: string,
    password: string,
    role?: string
}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const users = await usersModel.create({
            username, email, password: hashedPassword, role
        });
        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
}

interface UpdateUserBody {
    username?: string,
    email?: string,
    password?: string,
    role?: string
}

interface UpdateUserParams {
    id: string
}

export const updateUser: RequestHandler<UpdateUserParams, unknown, UpdateUserBody, unknown> = async (req, res, next) => {
    const { username, email, password, role } = req.body;
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        let updatedUser = await usersModel.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await usersModel.findByIdAndDelete(userId);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}