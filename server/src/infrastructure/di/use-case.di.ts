import { CreateArticleUseCase } from "../../application/implementation/articles/create-article.use-case";
import { GetArticleByIdUseCase } from "../../application/implementation/articles/get-article-by-id.use-case";
import { GetPersonalizedFeedsUseCase } from "../../application/implementation/articles/get-personalized-feeds.use-case";
import { ToggleLikeUseCase } from "../../application/implementation/articles/toggle-like.use-case";
import { ToggleDislikeUseCase } from "../../application/implementation/articles/toggle.dislike.use-case";
import { LoginUserUseCase } from "../../application/implementation/auth/login-user.use-case";
import { RefreshTokenUseCase } from "../../application/implementation/auth/refresh-token.use-case";
import { RegisterUserUseCase } from "../../application/implementation/auth/register-user.use-case";
import { GetAllCategoriesUseCase } from "../../application/implementation/category/get-all-categories.use-case";

import { repositories } from "./repository.di";
import { services } from "./service.di";

export const useCases = {
    registerUserUseCase: new RegisterUserUseCase(repositories.userRepository, services.bcrypt, services.jwtService),
    loginUserUseCase: new LoginUserUseCase(repositories.userRepository, services.jwtService, services.bcrypt),
    refreshTokenUseCase: new RefreshTokenUseCase(services.jwtService),
    getAllCategoriesUseCase: new GetAllCategoriesUseCase(repositories.categoryRepository),
    createArticleUseCase: new CreateArticleUseCase(repositories.articleRepository, services.cloudinaryStorage),
    getPersonalizedFeedsUseCase: new GetPersonalizedFeedsUseCase(
        repositories.userRepository,
        repositories.articleRepository,
        repositories.categoryRepository,
    ),
    getArticleByIdUseCase: new GetArticleByIdUseCase(repositories.articleRepository, repositories.userRepository),
    toggleLikeUseCase: new ToggleLikeUseCase(repositories.userRepository, repositories.articleRepository),
    toggleDislikeUseCase: new ToggleDislikeUseCase(repositories.userRepository, repositories.articleRepository),
};
