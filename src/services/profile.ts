import { supabase } from './client'
import type { Profile } from '../interfaces'

export async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single<Profile>()

  if (error || !data) return null

  return data
}
