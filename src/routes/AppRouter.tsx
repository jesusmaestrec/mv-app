import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Login } from '../pages';
import { useAuth } from '../hooks';
import { useAuthStore } from '../store';
import { getCurrentUser, onAuthStateChange } from '../services';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
}

export const AppRouter = () => {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    void (async () => {
      const currentUser = await getCurrentUser();
      useAuthStore.setState({ user: currentUser, loading: false });

      const { data } = onAuthStateChange((user) => {
        useAuthStore.setState({ user, loading: false });
      });

      cleanup = () => data.subscription.unsubscribe();
    })();

    return () => cleanup?.();
  }, []);

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
  );
};
