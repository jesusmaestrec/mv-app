import { supabase } from './client'
import type { CalendarEvent, InstrumentVoice } from '../interfaces'

export async function getCalendarEventList(
  voice: InstrumentVoice
): Promise<CalendarEvent[] | null> {
  const { data, error } = await supabase
    .from('calendar_events')
    .select<'*', CalendarEvent>('*')
    .contains('voices', [voice])

  if (error || !data) return null

  return data
}

export async function getCalendarEvent(
  id: string
): Promise<CalendarEvent | null> {
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('id', id)
    .single<CalendarEvent>()

  if (error || !data) return null

  return data
}
