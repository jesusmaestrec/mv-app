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
    await signIn(email, password)
      .then((authenticatedUser) => {
        set({
          user: {
            id: authenticatedUser.id,
            email: authenticatedUser.email ?? ''
          },
          isLogging: false
        })
      })
      .catch(() => {
        set({
          isLogging: false
        })
        throw new Error()
      })
  },
  isLogging: false,
  logout: async () => {
    await signOut()
    set({ user: null })
  }
}))
