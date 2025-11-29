import { NextFunction, Request, Response } from "express";
import { ZodType, ZodError } from "zod";
import { CustomError } from "../../domain/utils/custom-error";

export const validateRequest = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.body);
            req.body = parsed; // sanitized + typed
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const formattedErrors = err.issues.map(i => ({
                    field: i.path.join("."),
                    message: i.message,
                }));

                throw new CustomError("Validation failed", 422, true, formattedErrors);
            }
            next(err);
        }
    };
};
