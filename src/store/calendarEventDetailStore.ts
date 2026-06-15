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
    userAttendance: null,
    eventAttendance: null,

    initCalendarEventDetail: async (eventId: string, userId: string) => {
      set({ loading: true })

      try {
        const [calendarEvent, userAttendance, eventAttendance] =
          await Promise.all([
            getCalendarEvent(eventId),
            getUserAttendance(eventId, userId),
            getEventAttendance(eventId)
          ])

        set({
          calendarEvent,
          userAttendance,
          eventAttendance,
          loading: false
        })
      } catch (error) {
        set({ loading: false })
        throw error
      }
    },

    // si quieres mantenerlos individuales, puedes dejarlos así:
    getCalendarEvent: async (id) => {
      const calendarEvent = await getCalendarEvent(id)
      set({ calendarEvent })
    },

    getUserAttendance: async (eventId, userId) => {
      const userAttendance = await getUserAttendance(eventId, userId)
      set({ userAttendance })
    },

    getEventAttendance: async (eventId) => {
      const eventAttendance = await getEventAttendance(eventId)
      set({ eventAttendance })
    }
  })
)
