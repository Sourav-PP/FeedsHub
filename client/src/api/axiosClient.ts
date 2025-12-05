/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { store } from '../app/store';
import { setAccessToken, clearAuth } from '../app/slices/authSlice';

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else {
      if (token && prom.config.headers) prom.config.headers.Authorization = `Bearer ${token}`;
      prom.resolve(prom.config);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config?: any }) => {
    const originalConfig = error.config;

    if (!originalConfig || originalConfig._retry) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      // queue requests while refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig });
        });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint (refresh token is in httpOnly cookie)
        const refreshRes = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newAccessToken = (refreshRes.data && refreshRes.data.accessToken) || null;

        if (!newAccessToken) throw new Error('please login to continue');

        // update redux
        store.dispatch(setAccessToken(newAccessToken));

        // update pending requests in queue
        processQueue(null, newAccessToken);

        // set Authorization header and repeat original request
        if (originalConfig.headers) {
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosClient(originalConfig);
      } catch (err) {
        processQueue(err, null);
        // Logout if refresh fails
        store.dispatch(clearAuth());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
