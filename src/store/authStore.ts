import { create } from 'zustand'
import type { AuthState } from '@/interfaces'
import { signIn, signOut } from '@/services'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  login: async (email, password) => {
    const authenticatedUser = await signIn(email, password)
    set({
      user: authenticatedUser
        ? { id: authenticatedUser.id, email: authenticatedUser.email ?? '' }
        : null
    })
  },
  logout: async () => {
    await signOut()
    set({ user: null })
  }
}))
