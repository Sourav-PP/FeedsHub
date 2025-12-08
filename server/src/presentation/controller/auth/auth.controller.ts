import { NextFunction, Request, Response } from "express";
import { IRegisterUserUseCase } from "../../../application/interface/auth/register-user-use-case.interface";
import { config } from "../../../shared/config.constant";
import { ApiResponse } from "../../../shared/utils/response.util";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { CustomError } from "../../../domain/utils/custom-error";
import { HttpStatusCode } from "axios";
import { IRefreshTokenUseCase } from "../../../application/interface/auth/refresh-token-use-case.interface";
import { ILoginUserUseCase } from "../../../application/interface/auth/login-user-use-case.interface";
import { IUpdateProfileUseCase } from "../../../application/interface/auth/update-profile-use-case.interface";
import { IChangePasswordUseCase } from "../../../application/interface/auth/change-password-use-case.interface";
import { IGetProfileUseCase } from "../../../application/interface/auth/get-profile-use-case.interface";

export class AuthController {
    private _registerUserUseCase: IRegisterUserUseCase;
    private _loginUserUseCase: ILoginUserUseCase;
    private _refreshTokenUseCase: IRefreshTokenUseCase;
    private _updateProfileUseCase: IUpdateProfileUseCase;
    private _changePasswordUseCase: IChangePasswordUseCase;
    private _getProfileUseCase: IGetProfileUseCase;

    constructor(
        registerUserUseCase: IRegisterUserUseCase,
        loginUserUseCase: ILoginUserUseCase,
        refreshTokenUseCase: IRefreshTokenUseCase,
        updateProfileUseCase: IUpdateProfileUseCase,
        changePasswordUseCase: IChangePasswordUseCase,
        getProfileUseCase: IGetProfileUseCase,
    ) {
        this._registerUserUseCase = registerUserUseCase;
        this._loginUserUseCase = loginUserUseCase;
        this._refreshTokenUseCase = refreshTokenUseCase;
        this._updateProfileUseCase = updateProfileUseCase;
        this._changePasswordUseCase = changePasswordUseCase;
        this._getProfileUseCase = getProfileUseCase;
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

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new CustomError(generalMessages.ERROR.EMAIL_PASSWORD_REQUIRED, HttpStatusCode.BadRequest);
            }

            const data = await this._loginUserUseCase.execute(email, password);
            const { refreshToken, ...responseData } = data;

            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                secure: config.environment === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            ApiResponse.success(res, responseData, generalMessages.SUCCESS.LOGIN_SUCCESSFUL);
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.clearCookie("refreshToken");
            ApiResponse.success(res, null, generalMessages.SUCCESS.LOGOUT_SUCCESSFUL);
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

    getProfile = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            console.log('userId:', userId);
            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }

            const user = await this._getProfileUseCase.execute(userId);
            ApiResponse.success(res, user, generalMessages.SUCCESS.PROFILE_FETCHED);
        } catch (error) {
            next(error);
        }
    }

    updateProfile = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }
            const data = req.body;

            const updatedUser = await this._updateProfileUseCase.execute(userId, data);
            
            ApiResponse.success(res, updatedUser, generalMessages.SUCCESS.PROFILE_UPDATED);
        } catch (error) {
            next(error);
        }
    }

    changePassword = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }
            const { currentPassword, newPassword } = req.body;

            await this._changePasswordUseCase.execute(userId, { currentPassword, newPassword });
            
            ApiResponse.success(res, null, generalMessages.SUCCESS.PASSWORD_CHANGED);
        } catch (error) {
            next(error);
        }
    }
}
