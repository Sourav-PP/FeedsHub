import { Router } from "express";
import { RouteConst } from "../../shared/constant/routeConsts/route.constant";
import { controllers } from "../../infrastructure/di/controller.di";
import { validateRegisterUser } from "../validators/auth/middlewares/register-user.validator";
import { validateLoginUser } from "../validators/auth/middlewares/login-user.validator";

export class AuthRoutes {
    public route: Router;

    constructor() {
        this.route = Router();
        this.setRoute();
    }

    private setRoute(): void {
        this.route.post(RouteConst.AUTH.REGISTER, validateRegisterUser, controllers.authController.register);
        this.route.post(RouteConst.AUTH.LOGIN, validateLoginUser, controllers.authController.login);
        this.route.post(RouteConst.AUTH.LOGOUT, controllers.authController.logout);
        this.route.post(RouteConst.AUTH.REFRESH, controllers.authController.tokenRefresh);
    }
}
