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
