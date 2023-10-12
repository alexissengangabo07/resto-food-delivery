import { InferSchemaType, model, Schema } from "mongoose";

const foodsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
}, {
    timestamps: true
});

type Food = InferSchemaType<typeof foodsSchema>

export default model<Food>('foods', foodsSchema);