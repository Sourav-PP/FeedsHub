import { deleteArticleApi } from '../../../api/endpoints/article';
import { useState } from 'react';

export const useDeleteArticle = () => {
  const [loading, setLoading] = useState(false);
  const deleteArticle = async (articleId: string) => {
    if (!articleId) {
      throw new Error("Article ID is required for editing.");
    }
    
    try {
      setLoading(true);
      const response = await deleteArticleApi(articleId);
      return response;
    } catch (error) {
        console.error('Error during article update:', error);
        throw error; 
    } finally {
      setLoading(false);
    }
  };

  return { deleteArticle, loading };
};