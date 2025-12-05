import { Article } from "../../../domain/entities/article.entity";

export interface IGetPersonalizedFeedsUseCase {
  execute(userId: string, limit: number, skip: number): Promise<{ articles: Article[]; total: number }>;
}