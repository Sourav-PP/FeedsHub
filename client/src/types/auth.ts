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

export type ISignupResponse = ICommonResponse<ISignupResponseData>;