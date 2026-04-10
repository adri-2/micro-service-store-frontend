import api from "./axiosInstance";

export const accountService = {
  login: (creds) => api.post("/auth/login/", creds),
  refresh: (token) => api.post("/auth/refresh/", token),
  me: () => api.get("/auth/me/"),
  logout: () => api.post("/auth/blacklist/"),
};
