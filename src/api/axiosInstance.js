import axios from "axios";
import { getTokens, setAccessToken, clearTokens } from "../store/authStore";
const API_URL = import.meta.env.VITE_ACCOUNTS_BASE_URL;
const api = axios.create({
  baseURL: API_URL,
});
//
api.interceptors.request.use((config) => {
  // Skip adding token for auth endpoints (login, register, refresh)
  const url = config.url || "";
  const isAuthEndpoint =
    url.includes("/auth/login/") ||
    url.includes("/auth/register/") ||
    url.includes("/auth/refresh/");

  if (!isAuthEndpoint) {
    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

//
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const url = original?.url || "";
    const isAuthEndpoint =
      url.includes("/auth/login/") || url.includes("/auth/refresh/");

    if (
      error.response?.status === 401 &&
      !original?._retry &&
      !isAuthEndpoint
    ) {
      original._retry = true;
      try {
        const { refreshToken } = getTokens();
        if (!refreshToken) {
          clearTokens();
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        if (!data?.access) {
          clearTokens();
          return Promise.reject(error);
        }

        setAccessToken(data.access);
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        clearTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
