import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { IJwtService } from "../../../domain/services/jwt-service.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { IUserResponseDTO } from "../../dto/user.dto";
import { ILoginUserUseCase } from "../../interface/auth/login-user-use-case.interface";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { HttpStatusCode } from "axios";
import { IBcrypt } from "../../../domain/services/bcrypt.interface";
import { toLoginResponseDTO } from "../../mapper/auth.mapper";

export class LoginUserUseCase implements ILoginUserUseCase {
    private _userRepo: IUserRepository;
    private _jwtService: IJwtService;
    private _bcrypt: IBcrypt;

    constructor(userRepo: IUserRepository, jwtService: IJwtService, bcrypt: IBcrypt) {
        this._userRepo = userRepo;
        this._jwtService = jwtService;
        this._bcrypt = bcrypt;
    }

    async execute(
        email: string,
        password: string,
    ): Promise<{ user: IUserResponseDTO; accessToken: string; refreshToken: string }> {
        const user = await this._userRepo.findByEmail(email);
        if (!user) {
            throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
        }

        const isPasswordMatch = await this._bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new CustomError(generalMessages.ERROR.INVALID_CREDENTIAL, HttpStatusCode.BadRequest);
        }

        const accessToken = this._jwtService.generateAccessToken(user.id, user.email);
        const refreshToken = this._jwtService.generateRefreshToken(user.id, user.email);

        return toLoginResponseDTO(user, accessToken, refreshToken);
    }
}
