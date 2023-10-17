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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_model_1 = __importDefault(require("../models/users.model"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield users_model_1.default.find();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        const user = yield users_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const users = yield users_model_1.default.create({
            username, email, password: hashedPassword, role
        });
        res.status(201).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    const userId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        const user = yield users_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        let updatedUser = yield users_model_1.default.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        const user = yield users_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield users_model_1.default.findByIdAndDelete(userId);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
