import { Article } from "../../../domain/entities/article.entity";

export interface IGetArticleByIdUseCase {
  execute(id: string): Promise<Article | null>;
}