export interface BackendFieldError {
  field: string;
  message: string;
}
export interface ICommonResponse<T> {
  message: string;
  success: boolean;
  data?: T;
  errors?: BackendFieldError[];
}
