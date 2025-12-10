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
        const docs = await ArticleModel.find({ createdBy: new mongoose.Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .exec();
        return this._toDomainArray(docs);
    }

    async update(article: Partial<Article>): Promise<Article | null> {
        const doc = await ArticleModel.findByIdAndUpdate(article.id, article, { new: true });
        return doc ? this._toDomain(doc) : null;
    }
    async findAllArticles(
        userId: string,
        limit: number,
        skip: number,
        search?: string,
        category?: string,
    ): Promise<Article[]> {
        const queryConditions: any[] = [];

        const blockFilter = {
            blockedBy: { $nin: [userId] },
        };

        queryConditions.push(blockFilter);
        if (search) {
            queryConditions.push({
                $or: [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }],
            });
        }

        if (category && mongoose.Types.ObjectId.isValid(category)) {
            queryConditions.push({
                category: new mongoose.Types.ObjectId(category),
            });
        }

        const finalQuery = {
            $and: queryConditions,
        };

        const docs = await ArticleModel.find(finalQuery).sort({ createdAt: -1 }).limit(limit).skip(skip).exec();
        return this._toDomainArray(docs);
    }

    async findPersonalizedFeed(
        userId: string,
        searchTerms: string[],
        limit: number,
        skip: number,
        search?: string,
        category?: string,
    ): Promise<Article[]> {
        const objectIds = searchTerms
            .filter(term => mongoose.Types.ObjectId.isValid(term))
            .map(term => new mongoose.Types.ObjectId(term));

        const stringTerms = searchTerms;

        const query = {
            $or: [{ category: { $in: objectIds } }, { tags: { $in: stringTerms } }],
        };

        const additionalFilters: any[] = [];

        if (search) {
            additionalFilters.push({
                $or: [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }],
            });
        }

        if (category && mongoose.Types.ObjectId.isValid(category)) {
            additionalFilters.push({
                category: new mongoose.Types.ObjectId(category),
            });
        }

        const blockFilter = {
            blockedBy: { $nin: [userId] },
        };

        const finalQuery = {
            $and: [query, blockFilter, ...additionalFilters],
        };

        const docs = await ArticleModel.find(finalQuery).sort({ createdAt: -1 }).limit(limit).skip(skip).exec();
        return this._toDomainArray(docs);
    }

    async countAll(userId: string): Promise<number> {
        const blockFilter = {
            blockedBy: { $nin: [userId] },
        };
        return await ArticleModel.countDocuments(blockFilter);
    }
}
