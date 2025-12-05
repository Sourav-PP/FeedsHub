import axiosClient from '../axiosClient';
import type { IGetCategoriesResponse } from '../../types/category';
import { categoryRoutes } from '../routeConst/categoryRoutes';
import { apiErrorHandler } from '../../utils/apiErrorHandler';

export const fetchCategories = async (): Promise<IGetCategoriesResponse> => {
  try {
    const response = await axiosClient.get<IGetCategoriesResponse>(categoryRoutes.getAll);
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
}