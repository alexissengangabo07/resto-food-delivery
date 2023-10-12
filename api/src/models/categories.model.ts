import { InferSchemaType, model, Schema } from "mongoose";

const categoriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    categorieId: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
}, {
    timestamps: true
});

categoriesSchema.virtual('cat_id', {
    ref: 'foods',
    localField: '_id',
    foreignField: 'categoryId'
});

type Categorie = InferSchemaType<typeof categoriesSchema>

export default model<Categorie>('categories', categoriesSchema);