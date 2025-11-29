import { Router } from "express";
import { RouteConst } from "../../shared/constant/routeConsts/route.constant";
import { controllers } from "../../infrastructure/di/controller.di";

export class CategoryRoutes {
    public route: Router;

    constructor() {
        this.route = Router();
        this.setRoute();
    }

    private setRoute(): void {
        this.route.get(RouteConst.CATEGORY.GET_ALL, controllers.categoryController.getAll);
    }
}
