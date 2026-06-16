import type { InstrumentVoice } from './profile'
import type { NonNullableFields } from './general'

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
  eventType: CalendarEventType
  startsAt: string
  voices: InstrumentVoice[] | null
}

export type NewCalendarEvent = Omit<
  NonNullableFields<CalendarEvent>,
  'id' | 'eventType'
> & {
  eventType: CalendarEventType | ''
}

export interface UseRehearsalsThisWeekReturn {
  rehearsalsThisWeek: CalendarEvent[] | null
  loading: boolean
  error: string | null
}

export interface UseActivitiesReturn {
  activities: CalendarEvent[] | null
  loading: boolean
  error: string | null
}

export interface UseCalendarEventReturn {
  calendarEvent: CalendarEvent | null
  loading: boolean
  error: string | null
}
