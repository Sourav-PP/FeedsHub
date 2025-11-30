import { useDispatch } from "react-redux";
import { loginUser } from "../../../api/endpoints/auth";
import type { ILoginRequestData } from "../../../types/auth";
import { setAccessToken, setError, setLoading, setUser } from "../../../app/slices/authSlice";
import { generalMessages } from "../../../constants/generalMessages";

export const useLogin = () => {
  const dispatch = useDispatch();

  const login = async (formData: ILoginRequestData) => {
    try {
      dispatch(setLoading(true));

      const response = await loginUser(formData);

      if (!response.success || !response.data) {
        const message = response.message || generalMessages.ERROR.INTERNAL_SERVER_ERROR;
        dispatch(setError(message));
        return { success: false, message };
      }

      dispatch(setUser(response.data.user));
      dispatch(setAccessToken(response.data.accessToken));

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

  return { login };
};