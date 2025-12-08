import { IChangePasswordDTO } from "../../dto/auth.dto";

export interface IChangePasswordUseCase {
    execute(userId: string, data: IChangePasswordDTO): Promise<void>;
}