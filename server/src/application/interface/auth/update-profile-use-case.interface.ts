import { IUpdateUserDTO } from "../../dto/auth.dto";
import { IUserResponseDTO } from "../../dto/user.dto";

export interface IUpdateProfileUseCase {
    execute(userId: string, data: IUpdateUserDTO): Promise<IUserResponseDTO>;
}