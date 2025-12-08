import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../api/endpoints/auth';
import { setError, setLoading, setUser } from '../../../app/slices/authSlice';
import { generalMessages } from '../../../constants/generalMessages';
import type { IUpdateProfileDTO } from '../../../types/auth';

export const useUpdateProfile = () => {
  const dispatch = useDispatch();

  const updateProfileData = async (formData: IUpdateProfileDTO) => {
    dispatch(setLoading(true));
    try {
      const response = await updateProfile(formData);

      if (!response.success || !response.data) {
        const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
        dispatch(setError(message));
        return { success: false, message };
      }

      dispatch(setUser(response.data.user));

      return { success: true, message: response.message };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : generalMessages.ERROR.INTERNAL_SERVER_ERROR;
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateProfileData };
};
