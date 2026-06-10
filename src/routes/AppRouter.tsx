import { useEffect, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard, Login } from '../pages'
import { useAuth } from '../hooks'
import { useAuthStore, useProfileStore } from '../store'
import { getCurrentUser, onAuthStateChange } from '../services'

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  return user ? <Navigate to="/dashboard" replace /> : children
}

export const AppRouter = () => {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let profileLoaded = false

    void (async () => {
      const currentUser = await getCurrentUser()
      useAuthStore.setState({ user: currentUser, loading: false })

      if (currentUser?.id) {
        useProfileStore.getState().getProfile(currentUser.id)
        profileLoaded = true
      } else {
        useProfileStore.setState({ profile: null, loading: false })
      }

      const { data } = onAuthStateChange((user) => {
        useAuthStore.setState({ user, loading: false })

        if (user?.id) {
          if (!profileLoaded) {
            useProfileStore.getState().getProfile(user.id)
            profileLoaded = true
          }
        } else {
          useProfileStore.setState({ profile: null, loading: false })
          profileLoaded = false
        }
      })

      cleanup = () => data.subscription.unsubscribe()
    })()

    return () => cleanup?.()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
