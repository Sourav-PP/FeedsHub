import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../../domain/services/jwt-service.interface";
import { CustomError } from "../../domain/utils/custom-error";
import { generalMessages } from "../../shared/constant/messages/general-messages.constant";
import { HttpStatusCode } from "axios";

export const authMiddleware = (jwtService: IJwtService) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new CustomError(generalMessages.ERROR.NO_TOKEN, HttpStatusCode.Unauthorized);
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new CustomError(generalMessages.ERROR.NO_TOKEN, HttpStatusCode.Unauthorized);
        }

        const decoded = jwtService.verifyAccessToken(token);
        if (!decoded) {
            throw new CustomError(generalMessages.ERROR.INVALID_TOKEN, HttpStatusCode.Unauthorized);
        }

        req.user = {
            id: decoded.userId,
            email: decoded.email,
        };
        next();
    } catch (err) {
        if (err instanceof Error) {
            if (err.name === "TokenExpiredError") {
                return next(new CustomError(generalMessages.ERROR.TOKEN_EXPIRED, HttpStatusCode.Unauthorized));
            }
            next(err);
        } else {
            // fallback for non-Error objects
            next(new CustomError(generalMessages.ERROR.INTERNAL_SERVER_ERROR,HttpStatusCode.InternalServerError));
        }
    }
};
