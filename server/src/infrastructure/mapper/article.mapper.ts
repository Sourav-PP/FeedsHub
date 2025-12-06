import { Types } from "mongoose";
import { Article } from "../../domain/entities/article.entity";
import { Category } from "../../domain/entities/category.entity";
import { IArticleModel } from "../database/models/article.model";
import { ICategoryModel } from "../database/models/category.model";

export class ArticleMapper {
    static toDomain(doc: IArticleModel): Article {
        return {
            id: doc._id.toString(),
            createdBy: doc.createdBy.toString(),
            title: doc.title.toLowerCase(),
            description: doc.description,
            image: doc.image,
            tags: doc.tags,
            category: doc.category.toString(),
            likes: doc.likes,
            dislikes: doc.dislikes,
            blocks: doc.blocks,
            likedBy: doc.likedBy.map(l => l.toString()),
            dislikedBy: doc.dislikedBy.map(d => d.toString()),
            blockedBy: doc.blockedBy.map(b => b.toString()),
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    static toModel(doc: Partial<Article>): Partial<IArticleModel> {
        const model: Partial<IArticleModel> = {};

        if (doc.title !== undefined) model.title = doc.title.toLowerCase();
        if (doc.createdBy !== undefined) model.createdBy = new Types.ObjectId(doc.createdBy);
        if (doc.description !== undefined) model.description = doc.description;
        if (doc.image !== undefined) model.image = doc.image;
        if (doc.tags !== undefined) model.tags = doc.tags;
        if (doc.category !== undefined) model.category = new Types.ObjectId(doc.category);
        if (doc.likes !== undefined) model.likes = doc.likes;
        if (doc.dislikes !== undefined) model.dislikes = doc.dislikes;
        if (doc.blocks !== undefined) model.blocks = doc.blocks;
        if (doc.likedBy !== undefined) model.likedBy = doc.likedBy.map(l => new Types.ObjectId(l));
        if (doc.dislikedBy !== undefined) model.dislikedBy = doc.dislikedBy.map(d => new Types.ObjectId(d));
        if (doc.blockedBy !== undefined) model.blockedBy = doc.blockedBy.map(b => new Types.ObjectId(b));
        if (doc.createdAt !== undefined) model.createdAt = doc.createdAt;
        if (doc.updatedAt !== undefined) model.updatedAt = doc.updatedAt;

        return model;
    }
}
