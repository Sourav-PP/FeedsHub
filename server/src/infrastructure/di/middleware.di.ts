import { authMiddleware } from "../../presentation/middleware/auth.middelware";
import { services } from "./service.di";

export const middlewares = {
    auth: authMiddleware(services.jwtService),
};
