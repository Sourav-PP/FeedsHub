import { Schema } from "mongoose";
import { IArticleModel } from "../models/article.model";

export const articleSchema = new Schema<IArticleModel>(
    {
        title: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
                required: false,
            },
        ],
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        dislikes: {
            type: Number,
            default: 0,
        },
        blocks: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);
