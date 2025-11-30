import type { AxiosError } from 'axios';
import axiosClient from '../axiosClient';
import { generalMessages } from '../../constants/generalMessages';
import type { IGetCategoriesResponse } from '../../types/category';
import { categoryRoutes } from '../routeConst/categoryRoutes';

export const fetchCategories = async (): Promise<IGetCategoriesResponse> => {
  try {
    console.log('fetching categories')
    const response = await axiosClient.get<IGetCategoriesResponse>(categoryRoutes.getAll);
    console.log('res: ', response)
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message =
      axiosError?.response?.data?.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
    throw new Error(message);
  }
}