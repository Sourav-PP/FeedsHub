import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../api/endpoints/auth'; // Make sure the path is correct
import { setAccessToken, setError, setLoading, setUser } from '../../../app/slices/authSlice';
import { generalMessages } from '../../../constants/generalMessages';
import { persistor } from '../../../app/store';

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch(setLoading(true));

      const response = await logoutUser();

      if (!response.success) {
        const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
        dispatch(setError(message));
        return { success: false, message };
      }

      dispatch(setUser(null));
      dispatch(setAccessToken(null));
      persistor.purge();

      return { success: true, message: response.message || 'Successfully logged out.' };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : generalMessages.ERROR.INTERNAL_SERVER_ERROR;
      dispatch(setError(message));

      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { logout };
};
