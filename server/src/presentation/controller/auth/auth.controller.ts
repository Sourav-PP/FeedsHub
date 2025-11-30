import { NextFunction, Request, Response } from "express";
import { IRegisterUserUseCase } from "../../../application/interface/auth/register-user-use-case.interface";
import { config } from "../../../shared/config.constant";
import { ApiResponse } from "../../../shared/utils/response.util";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { CustomError } from "../../../domain/utils/custom-error";
import { HttpStatusCode } from "axios";
import { IRefreshTokenUseCase } from "../../../application/interface/auth/refresh-token-use-case.interface";

export class AuthController {
    private _registerUserUseCase: IRegisterUserUseCase;
    private _refreshTokenUseCase: IRefreshTokenUseCase;

    constructor(registerUserUseCase: IRegisterUserUseCase, refreshTokenUseCase: IRefreshTokenUseCase) {
        this._registerUserUseCase = registerUserUseCase;
        this._refreshTokenUseCase = refreshTokenUseCase;
    }

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { firstName, lastName, email, phone, dob, password, preference } = req.body;
            const data = await this._registerUserUseCase.execute({
                firstName,
                lastName,
                email,
                phone,
                dob,
                password,
                preference,
            });
            const { refreshToken, ...responseData } = data;

            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                secure: config.environment === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            ApiResponse.created(res, responseData, generalMessages.SUCCESS.REGISTRATION_SUCCESSFUL);
        } catch (error) {
            next(error);
        }
    };

    tokenRefresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throw new CustomError(generalMessages.ERROR.REFRESH_TOKEN_NOT_FOUND, HttpStatusCode.Unauthorized);
            }
            const { accessToken } = await this._refreshTokenUseCase.execute(refreshToken);

            ApiResponse.success(res, accessToken, generalMessages.SUCCESS.TOKEN_REFRESHED);
        } catch (error) {
            next(error);
        }
    };
}
