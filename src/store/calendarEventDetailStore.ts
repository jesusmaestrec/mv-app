import { create } from 'zustand'
import {
  getCalendarEvent,
  getEventApplicants,
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
    eventApplicants: [],

    initCalendarEventDetail: async (eventId: string, userId: string) => {
      set({ loading: true })

      try {
        const [
          calendarEvent,
          userAttendance,
          eventAttendance,
          eventApplicants
        ] = await Promise.all([
          getCalendarEvent(eventId),
          getUserAttendance(eventId, userId),
          getEventAttendance(eventId),
          getEventApplicants(eventId)
        ])

        set({
          calendarEvent,
          userAttendance,
          eventAttendance,
          eventApplicants,
          loading: false
        })
      } catch (error) {
        set({ loading: false })
        throw error
      }
    },

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
    },
    getEventApplicants: async (eventId) => {
      const eventApplicants = await getEventApplicants(eventId)
      set({ eventApplicants })
    }
  })
)
