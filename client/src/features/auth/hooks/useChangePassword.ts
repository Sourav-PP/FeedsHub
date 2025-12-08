import { useDispatch } from 'react-redux';
import { setError, setLoading } from '../../../app/slices/authSlice';
import { changePassword } from '../../../api/endpoints/auth';
import { generalMessages } from '../../../constants/generalMessages';
import type { IChangePasswordDTO } from '../../../types/auth';

export const useChangePassword = () => {
  const dispatch = useDispatch();

  const changeUserPassword = async (formData: IChangePasswordDTO) => {
    dispatch(setLoading(true));
    try {
      const response = await changePassword(formData);

      if (!response.success) {
        const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
        dispatch(setError(message));
        return { success: false, message };
      }

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

  return { changeUserPassword };
};
