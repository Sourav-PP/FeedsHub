import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from "zod";

export const RegisterUserSchema = z.object({
    firstName: z
        .string()
        .trim()
        .regex(/^[A-Za-z ]+$/, { message: "Name can only contain letters and spaces" })
        .min(2, { message: "First name must be at least 2 characters" })
        .max(50, { message: "First name cannot exceed 50 characters" }),
    lastName: z
        .string()
        .trim()
        .regex(/^[A-Za-z ]+$/, { message: "Name can only contain letters and spaces" })
        .min(1, { message: "First name must be at least 1 character" })
        .max(50, { message: "First name cannot exceed 50 characters" }),
    email: z.string().trim().email({ message: "Invalid email format" }),
    phone: z
        .string()
        .trim()
        .regex(/^\+[1-9]\d{7,14}$/, {
            message: "Enter a valid international phone number",
        })
        .refine(
            value => {
                const phone = parsePhoneNumberFromString(value);
                console.log("phone:", phone, "valid: ", phone?.isValid());
                return phone?.isValid() === true;
            },
            {
                message: "Phone number is not valid",
            },
        )
        .refine(value => !/^(\d)\1+$/.test(value.replace(/\D/g, "")), {
            message: "Phone number cannot be all repeated digits",
        }),
    dob: z
        .string()
        .transform(val => (val === "" ? undefined : val))
        .optional()
        .refine(date => {
            if (!date) return true; // allow empty
            const dob = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            return age >= 18 && age < 100;
        }, "You must be at least 18 years old and less than 100 years old"),
    password: z
        .string()
        .trim()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(30, { message: "Password must be at most 30 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    preference: z
        .array(z.string().min(1, "Invalid preference id"))
        .nonempty({ message: "At least one preference must be selected" }),
});
