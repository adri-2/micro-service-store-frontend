import { useState } from "react";
import { accountService } from "../api/accountService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, setTokens, clearAuth, refreshToken } = useAuthStore();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await accountService.login({ email, password });
      setTokens(data.access, data.refresh);
      const { data: user } = await accountService.me();
      setUser(user);
      return true;
    } catch (e) {
      setError(e.response?.data?.detail || "Identifiants incorrects");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    if (refreshToken) {
      await accountService.logout({ refresh: refreshToken }).catch(() => {});
    }
    clearAuth();
  };
  return { login, logout, loading, error };
}
