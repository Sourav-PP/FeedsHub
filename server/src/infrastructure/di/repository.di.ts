import { UserRepository } from "../repository/user.repository";
import { CategoryRepository } from "../repository/category.repository";

export const repositories = {
  userRepository: new UserRepository(),
  categoryRepository: new CategoryRepository(),
}