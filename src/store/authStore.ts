import { create } from 'zustand'
import type { AuthState } from '@/interfaces'
import { signIn, signOut } from '@/services'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  login: async (email, password) => {
    set({ isLogging: true })
    const authenticatedUser = await signIn(email, password)
    set({
      user: authenticatedUser
        ? { id: authenticatedUser.id, email: authenticatedUser.email ?? '' }
        : null,
      isLogging: false
    })
  },
  isLogging: false,
  logout: async () => {
    await signOut()
    set({ user: null })
  }
}))
