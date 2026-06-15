import type { CalendarEvent } from './calendarEvent'
import type { InstrumentVoice } from './profile'

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

export interface EventApplicant {
  id: string
  name: string
  lastName: string
  voice: InstrumentVoice
  confirmed: boolean | null
}

export interface CalendarEventDetailState {
  loading: boolean
  calendarEvent: CalendarEvent | null
  eventAttendance: EventAttendance | null
  userAttendance: UserAttendance | null
  eventApplicants: EventApplicant[]
  initCalendarEventDetail: (eventId: string, userId: string) => Promise<void>
  getCalendarEvent: (id: string) => Promise<void>
  getEventAttendance: (eventId: string) => Promise<void>
  getUserAttendance: (eventId: string, userId: string) => Promise<void>
  getEventApplicants: (eventdId: string) => Promise<void>
}
