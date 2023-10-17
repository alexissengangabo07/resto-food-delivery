"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoriesSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
categoriesSchema.virtual('cat_id', {
    ref: 'foods',
    localField: '_id',
    foreignField: 'categoryId'
});
exports.default = (0, mongoose_1.model)('categories', categoriesSchema);
