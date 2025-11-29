import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(user: Omit<User, "id">): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    updateById(userId: string, data: Partial<User>): Promise<User | null>;
    updatePassword(userId: string, password: string): Promise<boolean>;
}
