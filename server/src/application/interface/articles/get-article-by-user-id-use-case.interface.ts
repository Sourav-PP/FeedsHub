import { Article } from "../../../domain/entities/article.entity";

export interface IGetArticleByUserIdUseCase {
  execute(userId: string, limit: number, skip: number): Promise<{ articles: Article[]; total: number }>;
}