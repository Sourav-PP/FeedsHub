import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { HttpStatusCode } from "axios";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IUpdateUserDTO } from "../../dto/auth.dto";
import { IUserResponseDTO } from "../../dto/user.dto";
import { toUserResponseDTO } from "../../mapper/auth.mapper";
import { IUpdateProfileUseCase } from "../../interface/auth/update-profile-use-case.interface";

export class UpdateProfileUseCase implements IUpdateProfileUseCase {
    private _userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this._userRepo = userRepo;
    }

    async execute(userId: string, data: IUpdateUserDTO): Promise<IUserResponseDTO> {
        const user = await this._userRepo.findById(userId);

        if (!user) {
            throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
        }

       // Update the user data
        const updatedUser = await this._userRepo.updateById(userId, {
            firstName: data.firstName.trim().toLowerCase(),
            lastName: data.lastName.trim().toLowerCase(),
            phone: data.phone,
            dob: data.dob,
            preference: data.preference,
        });

        if (!updatedUser) {
            throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
        }

        return toUserResponseDTO(updatedUser);
    }
}