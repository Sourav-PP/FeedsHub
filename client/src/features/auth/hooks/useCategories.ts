import { generalMessages } from '../../../constants/generalMessages';
import type { ICategoryDTO } from '../../../types/dtos/category';
import { useCallback, useState } from 'react';
import { fetchCategories } from '../../../api/endpoints/category';

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategoryDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchCategories();

      if (!response.success || !response.data) {
        const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
        return { success: false, message };
      }

      setCategories(response.data);
      return { success: true, message: response.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading, getCategories };
};
