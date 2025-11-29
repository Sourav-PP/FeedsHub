import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositoryInterfaces/user.repository.interface";
import { IUserModel, UserModel } from "../database/models/user.model";
import { UserMapper } from "../mapper/user.mapper";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<User, IUserModel> implements IUserRepository {
    constructor() {
        super(UserModel, UserMapper.toDomain, UserMapper.toModel);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email }, "+password");
    }

    async updatePassword(userId: string, password: string): Promise<boolean> {
        const result = await UserModel.findByIdAndUpdate(userId, { password }, { new: true });
        return !!result;
    }
}
