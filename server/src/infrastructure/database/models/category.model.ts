import { model, Document, Types } from "mongoose";
import { categorySchema } from "../schemas/category.schema";

export interface ICategoryModel extends Document {
    _id: Types.ObjectId;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const CategoryModel = model<ICategoryModel>("Category", categorySchema);
