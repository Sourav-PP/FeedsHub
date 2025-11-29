import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain/utils/custom-error";
import { generalMessages } from "../../shared/constant/messages/general-messages.constant";
import { ApiResponse } from "../../shared/utils/response.util";
import { HttpStatusCode } from "axios";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof Error) {
        console.error(`Error occurred on ${req.method} ${req.originalUrl}`, {
            message: err.message,
            stack: err.stack,
        });
    } else {
        console.error(`Unknown error on ${req.method} ${req.originalUrl}`, { err });
    }

    if (err instanceof CustomError) {
        ApiResponse.error(res, err.message, err.statusCode, err.errors);
        return;
    }

    //unexpected error
    ApiResponse.error(res, generalMessages.ERROR.INTERNAL_SERVER_ERROR, HttpStatusCode.InternalServerError);
    return;
}
