import { create } from 'zustand'
import {
  getCalendarEvent,
  getEventAttendance,
  getUserAttendance
} from '@/services'
import type { CalendarEventDetailState } from '@/interfaces'

export const useCalendarEventDetailStore = create<CalendarEventDetailState>(
  (set) => ({
    loading: true,
    calendarEvent: null,
    getCalendarEvent: async (id) => {
      set({ loading: true })
      const calendarEvent = await getCalendarEvent(id)
      set({ calendarEvent, loading: false })
    },
    userAttendance: null,
    getUserAttendance: async (eventId, userId) => {
      const userAttendance = await getUserAttendance(eventId, userId)
      set({ userAttendance })
    },
    eventAttendance: null,
    getEventAttendance: async (eventId) => {
      const eventAttendance = await getEventAttendance(eventId)
      set({ eventAttendance })
    }
  })
)
