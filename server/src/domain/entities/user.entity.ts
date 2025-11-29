export interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: Date;
    password: string;
    preference: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
