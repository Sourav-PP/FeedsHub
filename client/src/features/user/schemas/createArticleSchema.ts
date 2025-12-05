import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const imageFileSchema = z
  .custom<FileList>()
  .refine((filelist) => filelist?.length > 0, {
    message: 'Image is required',
  })
  .refine((filelist) => filelist?.[0]?.size <= MAX_IMAGE_SIZE, {
    message: 'Image size should be less than 5MB',
  })
  .refine((filelist) => ACCEPTED_MIME_TYPES.includes(filelist?.[0]?.type), {
    message: 'Invalid image type',
  })
  .refine((filelist) => /\.(jpe?g|png|webp)$/i.test(filelist?.[0]?.name), {
    message: 'Invalid file extension',
  });

export const createArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(150, 'Title cannot exceed 150 characters')
    .regex(
      /^(?=.*[a-zA-Z]).+$/, // The new regex check
      'Title must contain at least one letter',
    ),
  description: z
    .string()
    .trim()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description cannot exceed 5000 characters'),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, 'Tag cannot be empty')
        .max(50, 'Tag cannot exceed 50 characters')
        .regex(/^[a-z0-9_+\-.]+$/i, 'Tags can only contain letters, numbers, _, -, +, or .')
        .transform((tag) => tag.toLowerCase()),
    )
    .nonempty('At least one tag is required')
    .max(5, 'Cannot use more than 5 tags'),
  category: z.string().trim().min(1, 'Category is required'),
  file: imageFileSchema,
});

export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;
