import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),
      setTokens: (access, refresh) =>
        set({ accessToken: access, refreshToken: refresh }),
      setAccessToken: (access) => set({ accessToken: access }),
      clearAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null }),
      isAuthenticated: () => !!get().accessToken,
    }),
    { name: "auth" },
  ),
);

export const getTokens = () => useAuthStore.getState();
export const setAccessToken = (access) =>
  useAuthStore.getState().setAccessToken(access);
export const clearTokens = () => useAuthStore.getState().clearAuth();
