import { Schema } from "mongoose";
import { ICategoryModel } from "../models/category.model";

export const categorySchema = new Schema<ICategoryModel>(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
