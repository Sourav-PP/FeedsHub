import { generalMessages } from '../../../constants/generalMessages';
import { useCallback, useState } from 'react';
import type { IArticleDTO } from '../../../types/dtos/article';
import { fetchArticleDetails } from '../../../api/endpoints/article';

export const useArticleDetails = () => {
  const [article, setArticle] = useState<IArticleDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const getArticle = useCallback(async (articleId: string) => {
    try {
      setLoading(true);
      const response = await fetchArticleDetails(articleId);

      if (!response.success || !response.data) {
        const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
        return { success: false, message };
      }

      setArticle(response.data);
      return { success: true, message: response.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { article, loading, getArticle };
};
