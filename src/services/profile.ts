import { supabase } from './client'
import type { Profile } from '@/interfaces'

export async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles_view')
    .select('*')
    .eq('id', id)
    .single<Profile>()

  if (error || !data) throw new Error()

  return data
}
