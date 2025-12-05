import { Article } from "../entities/article.entity";

export interface IArticleRepository {
    create(user: Omit<Article, "id">): Promise<Article>;
    findById(userId: string): Promise<Article | null>;
    findByUserId(userId: string): Promise<Article[]>;
    updateById(userId: string, data: Partial<Article>): Promise<Article | null>;
    deleteById(userId: string): Promise<boolean>;
    findPersonalizedFeed(preferences: string[], limit: number, skip: number): Promise<Article[]>;
    findAllArticles(limit: number, skip: number): Promise<Article[]>;
    countAll(): Promise<number>;
}