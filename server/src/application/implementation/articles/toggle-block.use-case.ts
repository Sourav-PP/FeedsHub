// src/application/useCases/articles/toggle-block-use-case.ts

import { HttpStatusCode } from "axios";
import { IArticleRepository } from "../../../domain/repositoryInterfaces/article.repository.interface";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user.repository.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { Article } from "../../../domain/entities/article.entity";
import { IToggleBlockUseCase } from "../../interface/articles/toggle-block-use-case.interface";

export class ToggleBlockUseCase implements IToggleBlockUseCase {
    private _userRepo: IUserRepository;
    private _articleRepo: IArticleRepository

    constructor(userRepo: IUserRepository, articleRepo: IArticleRepository) {
        this._userRepo = userRepo;
        this._articleRepo = articleRepo;
    }

    async execute(userId: string, articleId: string): Promise<Article | null> {
        const user = await this._userRepo.findById(userId);
        if(!user) throw new CustomError(generalMessages.ERROR.USER_NOT_FOUND, HttpStatusCode.NotFound);

        const article = await this._articleRepo.findById(articleId);
        if(!article) throw new CustomError(generalMessages.ERROR.ARTICLE_NOT_FOUND, HttpStatusCode.NotFound);

        if (!article.blockedBy) article.blockedBy = [];
        
        const blocked = article.blockedBy.some(id => id.toString() === userId);

        if (blocked) {
            // Remove block
            article.blockedBy = article.blockedBy!.filter(id => id !== userId);
            article.blocks = (article.blocks || 1) - 1; // Decrease block count
        } else {
            // Add block
            article.blockedBy!.push(userId);
            article.blocks = (article.blocks || 0) + 1; 
        }

        return this._articleRepo.update(article);
    }
}