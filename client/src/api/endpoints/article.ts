import axiosClient from '../axiosClient';
import type {
  IGetArticleDetailsResponse,
  ICreateArticleResponse,
  IGetArticlesResponse,
  IGetArticlesResponseData,
  IEditArticleResponse,
} from '../../types/article';
import { articleRoutes } from '../routeConst/articleRouts';
import { apiErrorHandler } from '../../utils/apiErrorHandler';
import type { IArticleDTO } from '../../types/dtos/article';
import type { ICommonResponse } from '../../types/common';

export const createArticle = async (data: FormData): Promise<ICreateArticleResponse> => {
  try {
    const response = await axiosClient.post<ICreateArticleResponse>(articleRoutes.create, data);
    return response.data;
  } catch (error) {
    return apiErrorHandler<IArticleDTO>(error);
  }
};

export const fetchPersonalizedFeed = async (
  page: number,
  limit: number,
): Promise<IGetArticlesResponse> => {
  try {
    const response = await axiosClient.get<IGetArticlesResponse>(articleRoutes.getPersonalized, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    return apiErrorHandler<IGetArticlesResponseData>(error);
  }
};

export const fetchArticleDetails = async (
  articleId: string,
): Promise<IGetArticleDetailsResponse> => {
  try {
    const response = await axiosClient.get<IGetArticleDetailsResponse>(
      articleRoutes.getDetails.replace(':articleId', articleId),
    );
    return response.data;
  } catch (error) {
    return apiErrorHandler<IArticleDTO>(error);
  }
};

export const fetchArticlesByUserId = async (): Promise<IGetArticlesResponse> => {
  try {
    const response = await axiosClient.get<IGetArticlesResponse>(articleRoutes.getByUserId);
    return response.data;
  } catch (error) {
    return apiErrorHandler<IGetArticlesResponseData>(error);
  }
};


export const likeArticle = async (articleId: string) => {
  try {
    const response = await axiosClient.post(articleRoutes.like.replace(':articleId', articleId));
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};

export const dislikeArticle = async (articleId: string) => {
  try {
    const response = await axiosClient.post(articleRoutes.dislike.replace(':articleId', articleId));
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};

export const blockArticle = async (articleId: string) => {
  try {
    const response = await axiosClient.post(articleRoutes.block.replace(':articleId', articleId));
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};

export const editArticle = async (
  articleId: string,
  data: FormData,
): Promise<IEditArticleResponse> => {
  try {
    const response = await axiosClient.put<IEditArticleResponse>(
      articleRoutes.edit.replace(':articleId', articleId),
      data,
    );
    return response.data;
  } catch (error) {
    return apiErrorHandler<IArticleDTO>(error);
  }
};

export const deleteArticleApi = async (articleId: string): Promise<ICommonResponse<void>> => {
  try {
    const response = await axiosClient.delete<ICommonResponse<void>>(
      articleRoutes.delete.replace(':articleId', articleId),
    );
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};
