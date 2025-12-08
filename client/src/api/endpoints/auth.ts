import type {
  IChangePasswordDTO,
  IFetchProfileResponse,
  ILoginRequestData,
  ISignupRequestData,
  ISignupResponse,
  ISignupResponseData,
  IUpdateProfileDTO,
} from '../../types/auth';
import axiosClient from '../axiosClient';
import { authRoute } from '../routeConst/authRoutes';
import type { ICommonResponse } from '../../types/common';
import { apiErrorHandler } from '../../utils/apiErrorHandler';
import type { IUserDTO } from '../../types/dtos/user';

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
};

export const logoutUser = async (): Promise<ICommonResponse<void>> => {
  try {
    const response = await axiosClient.post(authRoute.logout);
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};

export const fetchUserProfile = async (): Promise<IFetchProfileResponse> => {
  try {
    const response = await axiosClient.get<IFetchProfileResponse>(authRoute.profile);
    return response.data;
  } catch (error) {
    return apiErrorHandler<IUserDTO>(error);
  }
};

export const updateProfile = async (data: IUpdateProfileDTO): Promise<ISignupResponse> => {
  try {
    const response = await axiosClient.put<ISignupResponse>(authRoute.profile, data);
    return response.data;
  } catch (error) {
    return apiErrorHandler<ISignupResponseData>(error);
  }
};

export const changePassword = async (data: IChangePasswordDTO): Promise<ICommonResponse<void>> => {
  try {
    const response = await axiosClient.put<ICommonResponse<void>>(authRoute.changePassword, data);
    return response.data;
  } catch (error) {
    return apiErrorHandler(error);
  }
};
