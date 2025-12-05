import mongoose from "mongoose";
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

    async findAllArticles(limit: number, skip: number): Promise<Article[]> {
        const docs = await ArticleModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip).exec();
        return this._toDomainArray(docs);
    }

    async findPersonalizedFeed(searchTerms: string[], limit: number, skip: number): Promise<Article[]> {
        const objectIds = searchTerms
            .filter(term => mongoose.Types.ObjectId.isValid(term))
            .map(term => new mongoose.Types.ObjectId(term));
    
        const stringTerms = searchTerms;

        const query = {
            $or: [
                { category: { $in: objectIds } },
                { tags: { $in: stringTerms } }
            ]
        }

        const docs = await ArticleModel.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip).exec();
        return this._toDomainArray(docs);
    }

    async countAll(): Promise<number> {
        return await ArticleModel.countDocuments();
    }
}
