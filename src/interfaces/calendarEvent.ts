import type { InstrumentVoice } from './profile'

export type CalendarEventType =
  | 'rehearsal'
  | 'performance'
  | 'meeting'
  | 'other'

export interface CalendarEvent {
  id: string
  title: string
  description: string | null
  location: string | null
  event_type: CalendarEventType
  starts_at: string
  ends_at: string | null
  created_by: string | null
  created_at: string | null
  voices: InstrumentVoice[] | null
}

export interface UseCalendarEventListReturn {
  calendarEvents: CalendarEvent[] | null
  loading: boolean
  error: string | null
}

export interface UseCalendarEventReturn {
  calendarEvent: CalendarEvent | null
  loading: boolean
  error: string | null
}
