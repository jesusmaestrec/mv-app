import { Route, Routes, Navigate } from 'react-router-dom'
import { CalendarEventDetail, Dashboard, Login, ProfilePage } from '@/pages'
import { App } from '@/App'
import { AuthGate } from './AuthGate'

export function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/login"
        element={
          <AuthGate type="public">
            <Login />
          </AuthGate>
        }
      />

      <Route element={<App />}>
        <Route
          path="dashboard"
          element={
            <AuthGate type="private">
              <Dashboard />
            </AuthGate>
          }
        />

        <Route
          path="events/:id"
          element={
            <AuthGate type="private">
              <CalendarEventDetail />
            </AuthGate>
          }
        />

        <Route
          path="profile"
          element={
            <AuthGate type="private">
              <ProfilePage />
            </AuthGate>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
