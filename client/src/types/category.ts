import type { ICommonResponse } from "./common";
import type { ICategoryDTO } from "./dtos/category";


export type IGetCategoriesResponse = ICommonResponse<ICategoryDTO[]>