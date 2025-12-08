import { IUserResponseDTO } from "./user.dto";

export interface IRegisterUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    password: string;
    preference: string[];
}

export interface ILoginResponseDTO {
    user: IUserResponseDTO;
    accessToken: string;
    refreshToken: string;
}

export interface IUpdateUserDTO {
    firstName: string;
    lastName: string;
    phone: string;
    dob: Date;
    preference?: string[];
}

export interface IChangePasswordDTO {
    currentPassword: string;
    newPassword: string;
}