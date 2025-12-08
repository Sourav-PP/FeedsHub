import { z } from 'zod';

// Reuse the base validation but adjust for editing
export const editArticleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  description: z.string().min(50, 'Description must be at least 50 characters long.'),
  category: z.string().min(1, 'Please select a category.'),
  // Tags are not required to be present, but if present, must be strings
  tags: z.array(z.string()).optional(), 
  // File is optional during edit. We validate it only if provided.
  file: z.instanceof(FileList).optional().refine((files) => {
    // If files exist, check length and size (similar to your create logic)
    if (files && files.length > 0) {
      return files[0].size <= 10 * 1024 * 1024; // Max 10MB
    }
    return true; // Optional field passes if no file is provided
  }, `Image size must be less than 10MB.`),
  // The 'image' field (which holds the current URL, if any) is implicitly handled by the component state
});

export type EditArticleFormValues = z.infer<typeof editArticleSchema>;