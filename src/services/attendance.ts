import { supabase } from './client'
import type { EventAttendance, UserAttendance } from '../interfaces'

export async function getUserAttendance(
  eventId: string,
  userId: string
): Promise<UserAttendance | null> {
  const { data, error } = await supabase
    .from('attendances_view')
    .select('*')
    .eq('eventId', eventId)
    .eq('userId', userId)
    .limit(1)

  if (error || !data?.length) throw new Error()

  return data[0]
}

export async function getEventAttendance(
  eventId: string
): Promise<EventAttendance> {
  const { data, error } = await supabase
    .rpc('get_event_attendance_detail', {
      event_id: eventId
    })
    .single<EventAttendance>()

  if (error) throw error

  return {
    total: data?.total ?? 0,
    confirmed: data?.confirmed ?? 0,
    rejected: data?.rejected ?? 0
  }
}

export async function createUserAttendance(
  eventId: string,
  userId: string,
  confirmed: boolean
): Promise<UserAttendance | null> {
  const payload = {
    event_id: eventId,
    user_id: userId,
    confirmed
  }

  const { data, error } = await supabase
    .from('attendances')
    .insert(payload)
    .select()
    .single()

  if (error || !data) throw new Error()

  return data
}

export async function updateUserAttendance(
  id: string,
  confirmed: boolean
): Promise<UserAttendance | null> {
  const { data, error } = await supabase
    .from('attendances')
    .update({ confirmed })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) throw new Error()

  return data
}
