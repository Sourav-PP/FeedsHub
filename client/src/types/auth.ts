import type { ICommonResponse } from "./common";
import type { IUserDTO } from "./dtos/user";

export interface ISignupResponseData {
  user: IUserDTO;
  accessToken: string;
}

export interface ISignupRequestData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  password: string;
}

export interface ILoginRequestData {
  email: string;
  password: string;
}

export interface IChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface IUpdateProfileDTO {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  preference?: string[];
}

export type ISignupResponse = ICommonResponse<ISignupResponseData>;
export type IFetchProfileResponse = ICommonResponse<IUserDTO>;