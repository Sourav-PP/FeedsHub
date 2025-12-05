import type { ICommonResponse } from "./common";
import type { IArticleDTO } from "./dtos/article";

export interface ICreateArticleRequestData {
  title: string;
  description: string;
  file: FileList;
  tags: string[];
  category: string;
}

export type ICreateArticleResponse = ICommonResponse<IArticleDTO>;
