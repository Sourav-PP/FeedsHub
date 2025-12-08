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

    async findByUserId(userId: string, limit: number, skip: number): Promise<Article[]> {
        const docs = await ArticleModel.find({ createdBy: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 }).limit(limit).skip(skip).exec();;
        return this._toDomainArray(docs);
    }

    async update(article: Partial<Article>): Promise<Article | null> {
        const doc = await ArticleModel.findByIdAndUpdate(article.id, article, { new: true });
        return doc ? this._toDomain(doc) : null;
        
    }
    async findAllArticles(userId: string, limit: number, skip: number): Promise<Article[]> {
        const blockFilter = {
            blockedBy: { $nin: [userId] }
        };
        const docs = await ArticleModel.find(blockFilter).sort({ createdAt: -1 }).limit(limit).skip(skip).exec();
        return this._toDomainArray(docs);
    }

    async findPersonalizedFeed(userId: string, searchTerms: string[], limit: number, skip: number): Promise<Article[]> {
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

        const blockFilter = {
            blockedBy: { $nin: [userId] }
        };

        const finalQuery = {
            $and: [
                query,
                blockFilter
            ]
        };

        const docs = await ArticleModel.find(finalQuery).sort({ createdAt: -1 }).limit(limit).skip(skip).exec();
        return this._toDomainArray(docs);
    }

    async countAll(userId: string): Promise<number> {
        const blockFilter = {
            blockedBy: { $nin: [userId] }
        };
        return await ArticleModel.countDocuments(blockFilter);
    };
}
