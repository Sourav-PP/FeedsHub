import { User } from "../../domain/entities/user.entity";
import { ILoginResponseDTO } from "../dto/auth.dto";

export function toLoginResponseDTO(user: User, accessToken: string, refreshToken: string): ILoginResponseDTO {
    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            dob: user.dob,
            preference: user.preference,
        },
        accessToken,
        refreshToken,
    };
}

export function toUserResponseDTO(user: User) {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        dob: user.dob,
        preference: user.preference,
    }
}
