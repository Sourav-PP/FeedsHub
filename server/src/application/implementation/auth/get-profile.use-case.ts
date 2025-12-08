import { HttpStatusCode } from "axios";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { IUserResponseDTO } from "../../dto/user.dto";
import { IGetProfileUseCase } from "../../interface/auth/get-profile-use-case.interface";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { CustomError } from "../../../domain/utils/custom-error";
import { toUserResponseDTO } from "../../mapper/auth.mapper";

export class GetProfileUseCase implements IGetProfileUseCase {
  private _userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this._userRepo = userRepo;
  }

  async execute(userId: string): Promise<IUserResponseDTO> {
    const user = await this._userRepo.findById(userId);
    if (!user) {
      throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
    }
    return toUserResponseDTO(user);
  }
}