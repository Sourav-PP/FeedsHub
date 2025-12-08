import { ArticleController } from "../../presentation/controller/articles/article.controller";
import { AuthController } from "../../presentation/controller/auth/auth.controller";
import { CategoryController } from "../../presentation/controller/category/category.controller";
import { useCases } from "./use-case.di";

export const controllers = {
    authController: new AuthController(
        useCases.registerUserUseCase,
        useCases.loginUserUseCase,
        useCases.refreshTokenUseCase,
        useCases.updateProfileUseCase,
        useCases.changePasswordUseCase,
        useCases.getProfileUseCase,
    ),
    categoryController: new CategoryController(useCases.getAllCategoriesUseCase),
    articleController: new ArticleController(
        useCases.createArticleUseCase,
        useCases.getPersonalizedFeedsUseCase,
        useCases.getArticleByIdUseCase,
        useCases.toggleLikeUseCase,
        useCases.toggleDislikeUseCase,
        useCases.getArticleByUserIdUseCase,
        useCases.editArticleUseCase,
        useCases.deleteArticleUseCase,
        useCases.toggleBlockUseCase,
    ),
};
