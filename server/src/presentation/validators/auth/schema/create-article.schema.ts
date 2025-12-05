import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Magic number detection
const checkMagicNumber = (buffer: Buffer) => {
    console.log("running magic number");
    const signatures = {
        jpg: [0xff, 0xd8, 0xff],
        png: [0x89, 0x50, 0x4e, 0x47],
        webp: [0x52, 0x49, 0x46, 0x46], // RIFF
    };

    const bytes = Array.from(buffer.slice(0, 4));

    if (bytes.slice(0, 3).join(",") === signatures.jpg.join(",")) return true;
    if (bytes.join(",") === signatures.png.join(",")) return true;
    if (bytes.join(",") === signatures.webp.join(",")) return true;

    return false;
};

export const CreateArticleSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(150, "Title cannot exceed 150 characters")
        .regex(
            /^(?=.*[a-zA-Z]).+$/, // The new regex check
            "Title must contain at least one letter",
        ),
    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters")
        .max(5000, "Description cannot exceed 5000 characters"),
    tags: z
        .array(
            z
                .string()
                .trim()
                .min(1, "Tag cannot be empty")
                .max(50, "Tag cannot exceed 50 characters")
                .regex(/^[a-z0-9_+\-\.]+$/i, "Tags can only contain letters, numbers, _, -, +, or .")
                .transform(tag => tag.toLowerCase()),
        )
        .nonempty("At least one tag is required")
        .max(5, "Cannot use more than 5 tags"),
    category: z.string().trim().min(1, "Category is required"),
    file: z
        .any()
        .refine(file => file, "Image is required")
        .refine(file => file.size <= MAX_IMAGE_SIZE, "Image must be under 5MB")
        .refine(file => ACCEPTED_MIME_TYPES.includes(file.mimetype), "Only JPEG, PNG or WEBP allowed")
        .refine(file => checkMagicNumber(file.buffer), "Invalid or corrupted image file"),
});
