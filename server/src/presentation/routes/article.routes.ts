import { Router } from "express";
import { RouteConst } from "../../shared/constant/routeConsts/route.constant";
import { controllers } from "../../infrastructure/di/controller.di";
import { middlewares } from "../../infrastructure/di/middleware.di";
import { uploadSingle } from "../middleware/multer.middleware";
import { validateCreateArticle } from "../validators/auth/middlewares/create-article.validator";
import { requestLogger } from "../middleware/request-logger.middleware";


export class ArticleRoutes {
    public route: Router;

    constructor() {
        this.route = Router();
        this.setRoute();
    }

    private setRoute(): void {
        this.route.post(
            RouteConst.ARTICLE.CREATE,
            middlewares.auth,
            requestLogger,
            uploadSingle,
            validateCreateArticle,
            controllers.articleController.create,
        );
        this.route.get(
            RouteConst.ARTICLE.GET_PERSONALIZED,
            middlewares.auth,
            requestLogger,
            controllers.articleController.getPersonalizedFeed,
        );
        this.route.get(
            RouteConst.ARTICLE.GET_BY_USER_ID,
            middlewares.auth,
            controllers.articleController.getArticleByUserId,
        ),
            this.route.get(
                RouteConst.ARTICLE.GET_BY_ID,
                middlewares.auth,
                controllers.articleController.getArticleById,
            );

        this.route.post(RouteConst.ARTICLE.LIKE, middlewares.auth, requestLogger, controllers.articleController.like);
        this.route.post(
            RouteConst.ARTICLE.DISLIKE,
            middlewares.auth,
            requestLogger,
            controllers.articleController.dislike,
        );
        this.route.post(RouteConst.ARTICLE.BLOCK, middlewares.auth, requestLogger, controllers.articleController.block);
        this.route.put(
            RouteConst.ARTICLE.UPDATE_BY_ID,
            middlewares.auth,
            uploadSingle,
            requestLogger,
            controllers.articleController.edit,
        );
        this.route.delete(
            RouteConst.ARTICLE.DELETE_BY_ID,
            middlewares.auth,
            requestLogger,
            controllers.articleController.delete,
        );
    }
}
