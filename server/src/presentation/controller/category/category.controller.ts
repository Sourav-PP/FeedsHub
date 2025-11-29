import { NextFunction, Request, Response } from "express";
import { IGetAllCategoriesUseCase } from "../../../application/interface/category/get-all-categories-use-case.interface";
import { generalMessages } from "../../../shared/constant/messages/general-messages.constant";
import { ApiResponse } from "../../../shared/utils/response.util";

export class CategoryController {
    private _getAllCategoriesUseCase: IGetAllCategoriesUseCase;

    constructor(getAllCategoriesUseCase: IGetAllCategoriesUseCase) {
        this._getAllCategoriesUseCase = getAllCategoriesUseCase;
    }

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await this._getAllCategoriesUseCase.execute();
            ApiResponse.success(res, data, generalMessages.SUCCESS.CATEGORY_FETCHED);
        } catch (error) {
            next(error);
        }
    };
}
