import { generalMessages } from '../../../constants/generalMessages';
import type { IArticleDTO } from '../../../types/dtos/article';
import { useCallback, useState } from 'react';
import { fetchPersonalizedFeed } from '../../../api/endpoints/article';

export const usePersonalizedFeed = (initialLimit: number = 10) => {
  const [articles, setArticles] = useState<IArticleDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [currentSearch, setCurrentSearch] = useState<string | undefined>(undefined);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(undefined);

  const limit = initialLimit;
  const getFeed = useCallback(
    async (
      pageToLoad: number,
      search?: string,
      category?: string,
      // isInitialLoad: boolean = false,
    ) => {
      try {
        const filtersChanged = search !== currentSearch || category !== currentCategory;
        const effectivePageToLoad = filtersChanged ? 1 : pageToLoad;

        if (search !== undefined) setCurrentSearch(search);
        if (category !== undefined) setCurrentCategory(category);

        setLoading(true);
        const response = await fetchPersonalizedFeed(effectivePageToLoad, limit, search, category);

        if (!response.success || !response.data) {
          const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
          return { success: false, message };
        }

        const newArticles = response.data.articles;
        const totalCount = response.data.total;

        const calculatedTotalPages = Math.ceil(totalCount / limit);

        setArticles(newArticles);

        setPage(effectivePageToLoad);
        setTotalPages(calculatedTotalPages);
        setHasMore(effectivePageToLoad < calculatedTotalPages);

        return { success: true, message: response.message };
      } catch (error) {
        console.log(error);
        return { success: false, message: generalMessages.ERROR.INTERNAL_SERVER_ERROR };
      } finally {
        setLoading(false);
      }
    },
    [currentCategory, currentSearch, limit],
  );

  const fetchNextPage = useCallback(() => {
    if (loading || !hasMore) return;
    getFeed(page + 1, currentSearch, currentCategory);
  }, [loading, hasMore, getFeed, page, currentSearch, currentCategory]);

  // Refetch the first page
  const refetch = useCallback(
    () => getFeed(1, currentSearch, currentCategory),
    [currentCategory, currentSearch, getFeed],
  );

  return { articles, loading, page, totalPages, hasMore, getFeed, fetchNextPage, refetch };
};
