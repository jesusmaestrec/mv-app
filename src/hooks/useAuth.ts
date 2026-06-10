import { useAuthStore } from '../store';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
