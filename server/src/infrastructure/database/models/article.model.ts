import { model, Document, Types } from "mongoose";
import { articleSchema } from "../schemas/article.schema";

export interface IArticleModel extends Document {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: Types.ObjectId;
    likes: number;
    dislikes: number;
    blocks: number;
    likedBy: Types.ObjectId[];
    dislikedBy: Types.ObjectId[];
    blockedBy: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

export const ArticleModel = model<IArticleModel>("Article", articleSchema);
