import { Article } from "../../../domain/entities/article.entity";

export interface IToggleBlockUseCase {
  execute(userId: string, articleId: string): Promise<Article | null>;
}