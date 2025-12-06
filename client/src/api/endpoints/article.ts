import axiosClient from '../axiosClient';
import type {
  IGetArticleDetailsResponse,
  ICreateArticleResponse,
  IGetArticlesResponse,
  IGetArticlesResponseData,
} from '../../types/article';
import { articleRoutes } from '../routeConst/articleRouts';
import { apiErrorHandler } from '../../utils/apiErrorHandler';
import type { IArticleDTO } from '../../types/dtos/article';

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

// --- LIKE ARTICLE ---
export const likeArticle = async (articleId: string) => {
  try {
    const response = await axiosClient.post(
      articleRoutes.like.replace(":articleId", articleId)
    );
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};

// --- DISLIKE ARTICLE ---
export const dislikeArticle = async (articleId: string) => {
  try {
    const response = await axiosClient.post(
      articleRoutes.dislike.replace(":articleId", articleId)
    );
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};

// --- BLOCK ARTICLE ---
export const blockArticle = async (articleId: string) => {
  try {
    const response = await axiosClient.post(
      articleRoutes.block.replace(":articleId", articleId)
    );
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};

