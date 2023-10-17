"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const categories_route_1 = __importDefault(require("./routes/categories.route"));
const foods_route_1 = __importDefault(require("./routes/foods.route"));
const errors_1 = __importDefault(require("./middlewares/errors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use((0, morgan_1.default)('dev'));
app.use('/api/users', users_route_1.default);
app.use('/api/category', categories_route_1.default);
app.use('/api/food', foods_route_1.default);
app.use(errors_1.default);
exports.default = app;
