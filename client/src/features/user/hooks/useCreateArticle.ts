import { createArticle } from '../../../api/endpoints/article';
import { useState } from 'react';

export const useCreateArticle = () => {
  const [loading, setLoading] = useState(false);
  const create = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await createArticle(formData);
      console.log('response', response);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};
