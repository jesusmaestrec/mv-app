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
  eventAttendance: EventAttendance | null
  userAttendance: UserAttendance | null
  initCalendarEventDetail: (eventId: string, userId: string) => Promise<void>
  getCalendarEvent: (id: string) => Promise<void>
  getEventAttendance: (eventId: string) => Promise<void>
  getUserAttendance: (eventId: string, userId: string) => Promise<void>
}
