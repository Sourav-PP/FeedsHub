import { HttpStatusCode } from "axios";
import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { IGetPersonalizedFeedsUseCase } from "../../interface/articles/get-personalized-feeds-use-case.interface";
import { ICategoryRepository } from "../../../domain/repositoryInterfaces/category.repository.interface";
import { Article } from "../../../domain/entities/article.entity";

export class GetPersonalizedFeedsUseCase implements IGetPersonalizedFeedsUseCase {
    private _userRepo: IUserRepository;
    private _articleRepo: IArticleRepository;
    private _categoryRepo: ICategoryRepository;

    constructor(userRepo: IUserRepository, articleRepo: IArticleRepository, categoryRepo: ICategoryRepository) {
        this._userRepo = userRepo;
        this._articleRepo = articleRepo;
        this._categoryRepo = categoryRepo;
    }

    async execute(
        userId: string,
        limit: number,
        skip: number,
        search: string,
        category: string,
    ): Promise<{ articles: Article[]; total: number }> {
        const user = await this._userRepo.findById(userId);
        if (!user) {
            throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);
        }

        console.log('search: ', search)
        console.log('category: , ', category)
        const categoryIds = user.preference;
        const categories = await this._categoryRepo.findAll();

        const categoryNames = categories.map(c => c.name);

        const searchParams = [...categoryIds, ...categoryNames];

        let articles = await this._articleRepo.findPersonalizedFeed(userId, searchParams, limit, skip, search, category);
        let totalCount = await this._articleRepo.countAll(userId);

        let returnData = {
            articles: articles,
            total: totalCount,
        };

        if (articles.length === 0) {
            const articles = await this._articleRepo.findAllArticles(userId, limit, skip, search, category);
            returnData = {
                articles: articles,
                total: totalCount,
            };
        }

        console.log('articles: ', returnData.articles)

        return returnData;
    }
}
