import { IUserResponseDTO } from "../../dto/user.dto";

export interface ILoginUserUseCase {
    execute(
        email: string,
        password: string,
    ): Promise<{ user: IUserResponseDTO; accessToken: string; refreshToken: string }>;
}
