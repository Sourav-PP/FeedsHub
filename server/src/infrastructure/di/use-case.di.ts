import { RefreshTokenUseCase } from "../../application/implementation/auth/refresh-token.use-case";
import { RegisterUserUseCase } from "../../application/implementation/auth/register-user.use-case";
import { GetAllCategoriesUseCase } from "../../application/implementation/category/get-all-categories.use-case";

import { repositories } from "./repository.di";
import { services } from "./service.di";

export const useCases = {
  registerUserUseCase: new RegisterUserUseCase(repositories.userRepository, services.bcrypt, services.jwtService),
  refreshTokenUseCase: new RefreshTokenUseCase(services.jwtService),
  getAllCategoriesUseCase: new GetAllCategoriesUseCase(repositories.categoryRepository),
}