import { Article } from "../../../domain/entities/article.entity";

export interface IToggleLikeUseCase {
  execute(userId: string, articleId: string): Promise<Article | null>
}