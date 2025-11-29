import { NextFunction, Request, Response } from "express";
import { IRegisterUserUseCase } from "../../../application/interface/auth/register-user-use-case.interface";
import { config } from "../../../shared/config.constant";
import { ApiResponse } from "../../../shared/utils/response.util";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";

export class AuthController {
    private _registerUserUseCase: IRegisterUserUseCase;

    constructor(registerUserUseCase: IRegisterUserUseCase) {
        this._registerUserUseCase = registerUserUseCase;
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
}
