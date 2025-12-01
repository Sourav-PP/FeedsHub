import { NextFunction, Request, Response } from "express";
import { IGetAllCategoriesUseCase } from "../../../application/interface/category/get-all-categories-use-case.interface";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { ApiResponse } from "../../../shared/utils/response.util";
import { ICreateArticleUseCase } from "../../../application/interface/articles/create-article-use-case.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { HttpStatusCode } from "axios";

export class ArticleController {
    private _createArticleUseCase: ICreateArticleUseCase;

    constructor(createArticleUseCase: ICreateArticleUseCase) {
        this._createArticleUseCase = createArticleUseCase;
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const file = req.file;
            const { title, description, category, tags } = req.body;
            const userId = req.user?.id;

            if (!file) {
                throw new CustomError(generalMessages.ERROR.IMAGE_REQUIRED, HttpStatusCode.BadRequest);
            }

            if(!userId) {
              throw new CustomError(generalMessages.ERROR.UNAUTHORIZED, HttpStatusCode.Unauthorized);
            }

            const article = await this._createArticleUseCase.execute({
              title,
              description,
              file,
              category,
              createdBy: userId,
              tags
            })
            ApiResponse.success(res, article, generalMessages.SUCCESS.ARTICLE_CREATED);
        } catch (error) {
            next(error);
        }
    };
}
