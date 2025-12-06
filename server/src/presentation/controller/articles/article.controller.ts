import { NextFunction, Request, Response } from "express";
import { IGetAllCategoriesUseCase } from "../../../application/interface/category/get-all-categories-use-case.interface";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { ApiResponse } from "../../../shared/utils/response.util";
import { ICreateArticleUseCase } from "../../../application/interface/articles/create-article-use-case.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { HttpStatusCode } from "axios";
import { IGetPersonalizedFeedsUseCase } from "../../../application/interface/articles/get-personalized-feeds-use-case.interface";
import { IGetArticleByIdUseCase } from "../../../application/interface/articles/get-article-by-id-use-case.interface";
import { IToggleLikeUseCase } from "../../../application/interface/articles/toggle-like-use-case.interface";
import { IToggleDislikeUseCase } from "../../../application/interface/articles/toggle-dislike-use-case.interface";

export class ArticleController {
    private _createArticleUseCase: ICreateArticleUseCase;
    private _getPersonalizedFeedUseCase: IGetPersonalizedFeedsUseCase;
    private _getArticleByIdUseCase: IGetArticleByIdUseCase;
    private _toggleLikeUseCase: IToggleLikeUseCase;
    private _toggleDislikeUseCase: IToggleDislikeUseCase;

    constructor(
        createArticleUseCase: ICreateArticleUseCase,
        getPersonalizedFeedUseCase: IGetPersonalizedFeedsUseCase,
        getArticleByIdUseCase: IGetArticleByIdUseCase,
        toggleLikeUseCase: IToggleLikeUseCase,
        toggleDislikeUseCase: IToggleDislikeUseCase,
    ) {
        this._createArticleUseCase = createArticleUseCase;
        this._getPersonalizedFeedUseCase = getPersonalizedFeedUseCase;
        this._getArticleByIdUseCase = getArticleByIdUseCase;
        this._toggleLikeUseCase = toggleLikeUseCase;
        this._toggleDislikeUseCase = toggleDislikeUseCase;
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const file = req.file;
            const { title, description, category, tags } = req.body;
            const userId = req.user?.id;

            if (!file) {
                throw new CustomError(generalMessages.ERROR.IMAGE_REQUIRED, HttpStatusCode.BadRequest);
            }

            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }

            const article = await this._createArticleUseCase.execute({
                title,
                description,
                file,
                category,
                createdBy: userId,
                tags,
            });
            ApiResponse.success(res, article, generalMessages.SUCCESS.ARTICLE_CREATED);
        } catch (error) {
            next(error);
        }
    };

    getPersonalizedFeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const skip = (page - 1) * limit;

            const articles = await this._getPersonalizedFeedUseCase.execute(userId, limit, skip);
            ApiResponse.success(res, articles, generalMessages.SUCCESS.ARTICLES_FETCHED);
        } catch (error) {
            next(error);
        }
    };

    getArticleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }
            const articleId = req.params.articleId;
            if (!articleId) {
                throw new CustomError(generalMessages.ERROR.ARTICLE_ID_REQUIRED, HttpStatusCode.BadRequest);
            }
            const article = await this._getArticleByIdUseCase.execute(articleId);
            ApiResponse.success(res, article, generalMessages.SUCCESS.ARTICLES_FETCHED);
        } catch (error) {
            next(error);
        }
    };

    like = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }

            const articleId = req.params.articleId;
            if (!articleId) {
                throw new CustomError(generalMessages.ERROR.ARTICLE_ID_REQUIRED, HttpStatusCode.BadRequest);
            }

            const article = await this._toggleLikeUseCase.execute(userId, articleId);
            ApiResponse.success(res, article, generalMessages.SUCCESS.LIKED);
        } catch (error) {
            next(error);
        }
    }

    dislike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }

            const articleId = req.params.articleId;
            if (!articleId) {
                throw new CustomError(generalMessages.ERROR.ARTICLE_ID_REQUIRED, HttpStatusCode.BadRequest);
            }

            const article = await this._toggleDislikeUseCase.execute(userId, articleId); 
            ApiResponse.success(res, article, generalMessages.SUCCESS.DISLIKED);
        } catch (error) {
            next(error);
        }
    }
}
