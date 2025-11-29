import { Response } from "express";

export class ApiResponse {
    static success<T>(
        res: Response,
        data: T,
        message = "Success",
        statusCode = 200
    ) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static created<T>(
        res: Response,
        data: T,
        message = "Created"
    ) {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    }

    static error(
        res: Response,
        message: string,
        statusCode: number,
        errors?: any
    ) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors: errors || undefined,
        });
    }
}
