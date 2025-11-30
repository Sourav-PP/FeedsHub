import type { AxiosError } from 'axios';
import type { ILoginRequestData, ISignupRequestData, ISignupResponse } from '../../types/auth';
import axiosClient from '../axiosClient';
import { generalMessages } from '../../constants/generalMessages';
import { authRoute } from '../routeConst/authRoutes';

export const signupUser = async (data: ISignupRequestData): Promise<ISignupResponse> => {
  try {
    const response = await axiosClient.post<ISignupResponse>(authRoute.signup, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message =
      axiosError?.response?.data?.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
    throw new Error(message);
  }
};

export const loginUser = async (data: ILoginRequestData): Promise<ISignupResponse> => {
  try {
    const response = await axiosClient.post<ISignupResponse>(authRoute.login, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message =
      axiosError?.response?.data?.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
    throw new Error(message);
  }
}
