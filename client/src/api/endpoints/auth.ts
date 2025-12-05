import type { ILoginRequestData, ISignupRequestData, ISignupResponse, ISignupResponseData } from '../../types/auth';
import axiosClient from '../axiosClient';
import { authRoute } from '../routeConst/authRoutes';
import type { ICommonResponse } from '../../types/common';
import { apiErrorHandler } from '../../utils/apiErrorHandler';

export const signupUser = async (data: ISignupRequestData): Promise<ISignupResponse> => {
  try {
    const response = await axiosClient.post<ISignupResponse>(authRoute.signup, data);
    return response.data;
  } catch (error) {
    return apiErrorHandler<ISignupResponseData>(error);
  }
};

export const loginUser = async (data: ILoginRequestData): Promise<ISignupResponse> => {
  try {
    const response = await axiosClient.post<ISignupResponse>(authRoute.login, data);
    return response.data;
  } catch (error) {
    return apiErrorHandler<ISignupResponseData>(error);
  }
}

export const logoutUser = async (): Promise<ICommonResponse<void>> => {
  try {
    const response = await axiosClient.post(authRoute.logout);
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
}
