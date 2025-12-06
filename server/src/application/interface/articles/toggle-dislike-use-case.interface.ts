import { Article } from "../../../domain/entities/article.entity";

export interface IToggleDislikeUseCase {
  execute(userId: string, articleId: string): Promise<Article | null>
}