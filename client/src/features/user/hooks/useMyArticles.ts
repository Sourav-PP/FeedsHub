import { generalMessages } from '../../../constants/generalMessages';
import type { IArticleDTO } from '../../../types/dtos/article';
import { useCallback, useState } from 'react';
import { fetchArticlesByUserId } from '../../../api/endpoints/article';

export const useMyArticles = (initialLimit: number = 10) => {
  const [articles, setArticles] = useState<IArticleDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = initialLimit;
  const getArticles = useCallback(
    async (pageToLoad: number, isInitialLoad: boolean = false) => {
      try {
        setLoading(true);
        const response = await fetchArticlesByUserId();

        if (!response.success || !response.data) {
          const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
          return { success: false, message };
        }

        const newArticles = response.data.articles;
        const totalCount = response.data.total;

        const calculatedTotalPages = Math.ceil(totalCount / limit);

        setArticles((prevArticles) => {
          // If it's the first page or a fresh fetch, replace articles
          if (pageToLoad === 1 || isInitialLoad) {
            return newArticles;
          }
          // For subsequent pages, append new articles
          return [...prevArticles, ...newArticles];
        });

        setPage(pageToLoad);
        setTotalPages(calculatedTotalPages);
        setHasMore(pageToLoad < calculatedTotalPages);

        return { success: true, message: response.message };
      } catch (error) {
        console.log(error);
        return { success: false, message: generalMessages.ERROR.INTERNAL_SERVER_ERROR };
      } finally {
        setLoading(false);
      }
    },
    [limit],
  );

  const fetchNextPage = useCallback(() => {
    if (loading || !hasMore) return;
    getArticles(page + 1);
  }, [loading, hasMore, page, getArticles]);

  // Refetch the first page
  const refetch = useCallback(() => getArticles(1, true), [getArticles]);

  return { articles, loading, page, totalPages, hasMore, getArticles, fetchNextPage, refetch };
};
