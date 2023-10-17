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
exports.deleteFood = exports.updateFood = exports.createFood = exports.getFood = exports.getFoods = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const foods_model_1 = __importDefault(require("../models/foods.model"));
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield foods_model_1.default.find().populate('categoryId');
        res.status(200).json(foods);
    }
    catch (error) {
        next(error);
    }
});
exports.getFoods = getFoods;
const getFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foodId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(foodId)) {
            return res.status(400).json({ message: 'Invalid food id' });
        }
        const food = yield foods_model_1.default.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Foosd not found' });
        }
        res.status(200).json(food);
    }
    catch (error) {
        next(error);
    }
});
exports.getFood = getFood;
const createFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, categoryId } = req.body;
    try {
        if (!title) {
            return res.status(400).json({ message: 'title is required' });
        }
        if (!categoryId) {
            return res.status(400).json({ message: 'categoryId is required' });
        }
        const foods = yield foods_model_1.default.create({
            title, description, categoryId
        });
        res.status(201).json(foods);
    }
    catch (error) {
        next(error);
    }
});
exports.createFood = createFood;
const updateFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, categoryId } = req.body;
    const foodId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(foodId)) {
            return res.status(400).json({ message: 'Invalid food id' });
        }
        const food = yield foods_model_1.default.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        if (!title) {
            return res.status(400).json({ message: 'Food name is required' });
        }
        let updatedFood = yield foods_model_1.default.findByIdAndUpdate(foodId, req.body, { new: true });
        res.status(200).json(updatedFood);
    }
    catch (error) {
        next(error);
    }
});
exports.updateFood = updateFood;
const deleteFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foodId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(foodId)) {
            return res.status(400).json({ message: 'Invalid food id' });
        }
        const food = yield foods_model_1.default.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'food not found' });
        }
        yield foods_model_1.default.findByIdAndDelete(foodId);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFood = deleteFood;
