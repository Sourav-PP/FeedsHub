import { AuthController } from "../../presentation/controller/auth/auth.controller";
import { CategoryController } from "../../presentation/controller/category/category.controller";
import { useCases } from "./use-case.di";

export const controllers = {
  authController: new AuthController(useCases.registerUserUseCase, useCases.loginUserUseCase, useCases.refreshTokenUseCase),
  categoryController: new CategoryController(useCases.getAllCategoriesUseCase),
}