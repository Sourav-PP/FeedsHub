import { Article } from "../../../domain/entities/article.entity";
import { ICreateArticleDTO } from "../../dto/article.dto";

export interface IEditArticleUseCase {
  execute(id: string, data: ICreateArticleDTO): Promise<Article>;
}