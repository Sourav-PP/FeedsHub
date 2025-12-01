import { Article } from "../../domain/entities/article.entity";
import { IArticleRepository } from "../../domain/repositoryInterfaces/article.repository.interface";
import { ArticleModel, IArticleModel } from "../database/models/article.model";
import { ArticleMapper } from "../mapper/article.mapper";
import { BaseRepository } from "./base.repository";

export class ArticleRepository extends BaseRepository<Article, IArticleModel> implements IArticleRepository {
    constructor() {
        super(ArticleModel, ArticleMapper.toDomain, ArticleMapper.toModel);
    }

    async findByUserId(userId: string): Promise<Article[]> {
        const docs = await ArticleModel.find({ createdBy: userId });
        return this._toDomainArray(docs);
    }
}
