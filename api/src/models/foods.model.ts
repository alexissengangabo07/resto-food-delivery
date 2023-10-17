import { InferSchemaType, model, Schema } from "mongoose";

const foodsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    image: {
        public_id: {
            type: String,  
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

type Food = InferSchemaType<typeof foodsSchema>

export default model<Food>('foods', foodsSchema);