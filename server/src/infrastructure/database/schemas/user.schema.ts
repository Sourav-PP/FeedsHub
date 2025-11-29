import { Schema } from "mongoose";
import { IUserModel } from "../models/user.model";

export const userSchema = new Schema<IUserModel>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: false,
        },
        dob: {
            type: Date,
        },
        preference: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        password: {
            type: String,
            required: false,
            select: false,
        },
    },
    { timestamps: true },
);
