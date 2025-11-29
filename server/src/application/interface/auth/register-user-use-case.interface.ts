import { IRegisterUserDTO } from "../../dto/auth.dto";
import { IUserResponseDTO } from "../../dto/user.dto";

export interface IRegisterUserUseCase {
    execute(data: IRegisterUserDTO): Promise<{ user: IUserResponseDTO; accessToken: string; refreshToken: string }>;
}
