import { supabase } from './client'
import type { CalendarEvent, InstrumentVoice } from '../interfaces'

export async function getCalendarEvents(
  voice: InstrumentVoice
): Promise<CalendarEvent[] | null> {
  const { data, error } = await supabase
    .from('calendar_events')
    .select<'*', CalendarEvent>('*')
    .contains('voices', [voice])

  if (error || !data) return null

  return data
}
