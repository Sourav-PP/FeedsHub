import { Article } from "../entities/article.entity";

export interface IArticleRepository {
    create(user: Omit<Article, "id">): Promise<Article>;
    findById(userId: string): Promise<Article | null>;
    findByUserId(userId: string, limit: number, skip: number): Promise<Article[]>;
    updateById(userId: string, data: Partial<Article>): Promise<Article | null>;
    update(article: Partial<Article>): Promise<Article | null>;
    deleteById(userId: string): Promise<boolean>;
    findPersonalizedFeed(userId: string, searchTerms: string[], limit: number, skip: number): Promise<Article[]>;
    findAllArticles(userId: string, limit: number, skip: number): Promise<Article[]>;
    countAll(userId: string): Promise<number>;
}