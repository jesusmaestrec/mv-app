import { supabase } from './client'
import type { Attendance } from '../interfaces'

export async function getAttendance(
  eventId: string,
  userId: string
): Promise<Attendance | null> {
  const { data, error } = await supabase
    .from('attendances_view')
    .select('*')
    .eq('eventId', eventId)
    .eq('userId', userId)
    .limit(1)

  if (error || !data?.length) return null

  return data[0]
}
