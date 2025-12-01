import { UserRepository } from "../repository/user.repository";
import { CategoryRepository } from "../repository/category.repository";
import { ArticleRepository } from "../repository/article.repository";

export const repositories = {
    userRepository: new UserRepository(),
    categoryRepository: new CategoryRepository(),
    articleRepository: new ArticleRepository(),
};
