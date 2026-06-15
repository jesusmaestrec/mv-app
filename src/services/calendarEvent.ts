import { supabase } from './client'
import type {
  CalendarEvent,
  NewCalendarEvent,
  InstrumentVoice
} from '@/interfaces'

export async function getCalendarEventList(
  voice: InstrumentVoice
): Promise<CalendarEvent[] | null> {
  const { data, error } = await supabase.rpc('get_events_this_week', {
    v: voice
  })

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

export async function createCalendarEvent(
  newCalendarEvent: NewCalendarEvent
): Promise<void> {
  const payload = {
    title: newCalendarEvent.title,
    description: newCalendarEvent.description,
    event_type: newCalendarEvent.eventType,
    location: newCalendarEvent.location,
    starts_at: newCalendarEvent.startsAt,
    voices: newCalendarEvent.voices
  }

  const { error } = await supabase
    .from('calendar_events')
    .insert(payload)
    .select()
    .single()

  if (error) throw new Error()
}
