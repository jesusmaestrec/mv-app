import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks'

type Props = {
  children: ReactNode
  type: 'private' | 'public'
}

export function AuthGate({ children, type }: Props) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (type === 'private' && !user) {
    return <Navigate to="/login" replace />
  }

  if (type === 'public' && user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
