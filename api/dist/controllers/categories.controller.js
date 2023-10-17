"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categories_model_1 = __importDefault(require("../models/categories.model"));
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: 'Invalid categorie id' });
        }
        const category = yield categories_model_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const categories = yield categories_model_1.default.create({
            title
        });
        res.status(201).json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const categoryId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: 'Invalid category id' });
        }
        const category = yield categories_model_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        let updatedCategory = yield categories_model_1.default.findByIdAndUpdate(categoryId, req.body, { new: true });
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: 'Invalid category id' });
        }
        const category = yield categories_model_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        yield categories_model_1.default.findByIdAndDelete(categoryId);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
