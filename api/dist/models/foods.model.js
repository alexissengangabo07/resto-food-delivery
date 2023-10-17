"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('foods', foodsSchema);
