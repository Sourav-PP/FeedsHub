import { Article } from "../../../domain/entities/article.entity";
import { ICreateArticleDTO } from "../../dto/article.dto";

export interface ICreateArticleUseCase {
    execute(data: ICreateArticleDTO): Promise<Article>;
}
