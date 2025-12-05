import type { AxiosError } from "axios";
import type { ICommonResponse } from "../types/common"; // adjust path
import { generalMessages } from "../constants/generalMessages";

export const apiErrorHandler = <T>(
  error: unknown
): ICommonResponse<T> => {
  const axiosError = error as AxiosError<ICommonResponse<T>>;

  // Case 1: Backend errors
  if (axiosError.response?.data) {
    return axiosError.response.data;
  }

  // Network error or unknown error
  return {
    success: false,
    message: axiosError.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR,
  };
};
