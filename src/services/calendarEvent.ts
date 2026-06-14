import { supabase } from './client'
import type { CalendarEvent, InstrumentVoice } from '@/interfaces'

export async function getCalendarEventList(
  voice: InstrumentVoice
): Promise<CalendarEvent[] | null> {
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('calendar_events_view')
    .select<'*', CalendarEvent>('*')
    .contains('voices', [voice])
    .gt('startsAt', now)

  if (error || !data) throw new Error()

  return data
}
export async function getCalendarEvent(
  id: string
): Promise<CalendarEvent | null> {
  const { data, error } = await supabase
    .from('calendar_events_view')
    .select('*')
    .eq('id', id)
    .single<CalendarEvent>()

  if (error || !data) throw new Error()

  return data
}
