import type { ICommonResponse } from "./common";
import type { IArticleDTO } from "./dtos/article";

export interface ICreateArticleRequestData {
  title: string;
  description: string;
  file: FileList;
  tags: string[];
  category: string;
}

export interface IGetArticlesResponseData {
  articles: IArticleDTO[];
  total: number;
}

export type ICreateArticleResponse = ICommonResponse<IArticleDTO>;
export type IEditArticleResponse = ICommonResponse<IArticleDTO>;
export type IGetArticlesResponse = ICommonResponse<IGetArticlesResponseData>;
export type IGetArticleDetailsResponse = ICommonResponse<IArticleDTO>;
