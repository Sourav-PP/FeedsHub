import { editArticle } from '../../../api/endpoints/article';
import { useState } from 'react';

export const useEditArticle = () => {
  const [loading, setLoading] = useState(false);
  const edit = async (articleId: string, updates: FormData) => {
    if (!articleId) {
      throw new Error("Article ID is required for editing.");
    }
    
    try {
      setLoading(true);
      const response = await editArticle(articleId, updates);
      return response;
    } catch (error) {
        console.error('Error during article update:', error);
        throw error; 
    } finally {
      setLoading(false);
    }
  };

  return { edit, loading };
};