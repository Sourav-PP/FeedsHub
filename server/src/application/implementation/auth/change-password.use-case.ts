import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { IBcrypt } from "../../../domain/services/bcrypt.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { HttpStatusCode } from "axios";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IChangePasswordDTO } from "../../dto/auth.dto";
import { IChangePasswordUseCase } from "../../interface/auth/change-password-use-case.interface";

export class ChangePasswordUseCase implements IChangePasswordUseCase {
    private _userRepo: IUserRepository;
    private _bcrypt: IBcrypt;

    constructor(userRepo: IUserRepository, bcrypt: IBcrypt) {
        this._userRepo = userRepo;
        this._bcrypt = bcrypt;
    }

    async execute(userId: string, data: IChangePasswordDTO): Promise<void> {
        const user = await this._userRepo.findById(userId);
        console.log('data: ', data);
        if (!user) {
            throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
        }
        const userWithPassword = await this._userRepo.findByEmail(user.email);

        if (!userWithPassword) {
            throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
        }

        const isMatch = await this._bcrypt.compare(data.currentPassword, userWithPassword.password);

        if (!isMatch) {
            throw new CustomError(generalMessages.ERROR.INVALID_PASSWORD, HttpStatusCode.Unauthorized);
        }

        const newHashedPassword = await this._bcrypt.hash(data.newPassword);

        await this._userRepo.updatePassword(userId, newHashedPassword);
    }
}