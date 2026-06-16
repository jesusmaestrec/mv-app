export interface AuthUser {
  id: string
  email: string
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  isLogging: boolean
  logout: () => Promise<void>
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
}
