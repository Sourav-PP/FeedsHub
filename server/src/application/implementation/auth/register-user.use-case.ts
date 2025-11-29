import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { IBcrypt } from "../../../domain/services/bcrypt.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IRegisterUserDTO } from "../../dto/auth.dto";
import { IUserResponseDTO } from "../../dto/user.dto";
import { IRegisterUserUseCase } from "../../interface/auth/register-user-use-case.interface";
import { HttpStatusCode } from "axios";
import { IJwtService } from "../../../domain/services/jwt-service.interface";
import { toLoginResponseDTO } from "../../mapper/auth.mapper";

export class RegisterUserUseCase implements IRegisterUserUseCase {
    private _userRepo: IUserRepository;
    private _bcrypt: IBcrypt;
    private _jwtService: IJwtService;

    constructor(userRepo: IUserRepository, bcrypt: IBcrypt, jwtService: IJwtService) {
        this._userRepo = userRepo;
        this._bcrypt = bcrypt;
        this._jwtService = jwtService;
    }

    async execute(
        data: IRegisterUserDTO,
    ): Promise<{ user: IUserResponseDTO; accessToken: string; refreshToken: string }> {
        const existingUser = await this._userRepo.findByEmail(data.email);

        if (existingUser) {
            throw new CustomError(generalMessages.ERROR.EMAIL_EXISTS, HttpStatusCode.BadRequest);
        }

        const hashedPassword = await this._bcrypt.hash(data.password);
        const user = await this._userRepo.create({
            firstName: data.firstName.trim().toLowerCase(),
            lastName: data.lastName.trim().toLowerCase(),
            email: data.email,
            phone: data.phone,
            dob: new Date(data.dob),
            password: hashedPassword,
            preference: data.preference,
        });

        const accessToken = this._jwtService.generateAccessToken(user.id, user.email);
        const refreshToken = this._jwtService.generateRefreshToken(user.id, user.email);

        return toLoginResponseDTO(user, accessToken, refreshToken);
    }
}
