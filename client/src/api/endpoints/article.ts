import axiosClient from '../axiosClient';
import type { ICreateArticleResponse } from '../../types/article';
import { articleRoutes } from '../routeConst/articleRouts';
import { apiErrorHandler } from '../../utils/apiErrorHandler';
import type { IArticleDTO } from '../../types/dtos/article';

export const createArticle = async (
  data: FormData,
): Promise<ICreateArticleResponse> => {
  try {
    const response = await axiosClient.post<ICreateArticleResponse>(articleRoutes.create, data);
    return response.data;
  } catch (error) {
    return apiErrorHandler<IArticleDTO>(error);
  }
};
