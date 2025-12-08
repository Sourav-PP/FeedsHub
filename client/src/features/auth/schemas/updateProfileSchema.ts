import parsePhoneNumberFromString from 'libphonenumber-js';
import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .regex(/^[A-Za-z ]+$/, { message: 'Name can only contain letters and spaces' })
    .min(2, { message: 'name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z ]+$/, { message: 'Name can only contain letters and spaces' })
    .min(1, { message: 'name must be at least 1 characters long' })
    .max(50, { message: 'Name must be at most 50 characters' }),
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{7,14}$/, {
      message: 'Enter a valid international phone number',
    })
    .refine(
      (value) => {
        const phone = parsePhoneNumberFromString(value);
        return phone?.isValid() === true;
      },
      {
        message: 'Phone number is not valid',
      },
    )
    .refine((value) => !/^(\d)\1+$/.test(value.replace(/\D/g, '')), {
      message: 'Phone number cannot be all repeated digits',
    }),
  dob: z.string().refine((val) => {
    const dob = new Date(val);
    if (isNaN(dob.getTime())) return false; // invalid date string

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 18 && age < 100;
  }, 'You must be at least 18 years old and less than 100 years old'),
  preference: z
    .array(z.string().min(1, { message: 'Invalid category ID' }))
    .min(1, { message: 'Select at least one category' }), // require at least one category
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
