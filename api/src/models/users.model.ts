import { InferSchemaType, model, Schema } from "mongoose";

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String
}, {
    timestamps: true
});

type User = InferSchemaType<typeof usersSchema>

export default model<User>('notes', usersSchema);