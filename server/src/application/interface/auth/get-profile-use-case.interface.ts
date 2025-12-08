import { IUserResponseDTO } from "../../dto/user.dto";

export interface IGetProfileUseCase {
  execute(userId: string): Promise<IUserResponseDTO>
}