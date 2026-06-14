import { supabase } from './client'
import type { AuthUser } from '@/interfaces'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error

  return data.user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data, error } = await supabase.auth.getUser()

  if (error) return null

  const user = data.user

  if (!user) return null

  return {
    id: user.id,
    email: user.email ?? ''
  }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    const user = session?.user

    callback(
      user
        ? {
            id: user.id,
            email: user.email ?? ''
          }
        : null
    )
  })
}
