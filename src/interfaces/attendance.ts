import type { CalendarEvent } from './calendarEvent'

export interface UserAttendance {
  id: string
  eventId: string
  userId: string
  confirmed: boolean
}

export interface EventAttendance {
  total: number
  confirmed: number
  rejected: number
}

export interface CalendarEventDetailState {
  loading: boolean
  calendarEvent: CalendarEvent | null
  getCalendarEvent: (id: string) => Promise<void>
  eventAttendance: EventAttendance | null
  getEventAttendance: (eventId: string) => Promise<void>
  userAttendance: UserAttendance | null
  getUserAttendance: (eventId: string, userId: string) => Promise<void>
}
