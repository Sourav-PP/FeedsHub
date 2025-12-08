import { useState, useCallback } from 'react';
import type { IUserDTO } from '../../../types/dtos/user';
import { useDispatch } from 'react-redux';
import { setError, setLoading } from '../../../app/slices/authSlice';
import { fetchUserProfile } from '../../../api/endpoints/auth';
import { generalMessages } from '../../../constants/generalMessages';

export const useFetchProfile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<IUserDTO | null>(null);

  const fetchProfileData = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetchUserProfile();

      if (!response.success || !response.data) {
        const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
        dispatch(setError(message));
        return { success: false, message };
      }

      setProfile(response.data);
      return { success: true, message: response.message };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : generalMessages.ERROR.INTERNAL_SERVER_ERROR;
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return { profile, fetchProfileData };
};
