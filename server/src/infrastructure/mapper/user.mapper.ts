import { Types } from "mongoose";
import { User } from "../../domain/entities/user.entity";
import { IUserModel } from "../database/models/user.model";

export class UserMapper {
    static toDomain(doc: IUserModel): User {
        return {
            id: doc._id.toString(),
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            phone: doc.phone,
            dob: doc.dob,
            password: doc.password,
            preference: doc.preference.map(p => p.toString()),
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    static toModel(user: Partial<User>): Partial<IUserModel> {
        const model: Partial<IUserModel> = {};

        if (user.firstName !== undefined) model.firstName = user.firstName;
        if (user.lastName !== undefined) model.lastName = user.lastName;
        if (user.email !== undefined) model.email = user.email;
        if (user.phone !== undefined) model.phone = user.phone;
        if (user.dob !== undefined) model.dob = user.dob;
        if (user.password !== undefined) model.password = user.password;
        if (user.preference !== undefined) model.preference = user.preference.map(id => new Types.ObjectId(id));

        return model;
    }
}
