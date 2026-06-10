import { create } from 'zustand';
import type { AuthUser } from '../interfaces';
import { signIn, signOut } from '../services';

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  login: async (email, password) => {
    const authenticatedUser = await signIn(email, password);
    set({
      user: authenticatedUser
        ? { id: authenticatedUser.id, email: authenticatedUser.email ?? '' }
        : null,
    });
  },
  logout: async () => {
    await signOut();
    set({ user: null });
  },
}));
