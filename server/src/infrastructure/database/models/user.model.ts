import { model, Document, Types } from "mongoose";
import { userSchema } from "../schemas/user.schema";

export interface IUserModel extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: Date;
    password: string;
    preference: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

export const UserModel = model<IUserModel>("User", userSchema);
