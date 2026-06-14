import { useCalendarEventDetailStore } from '@/store'

export function useCalendarEventDetail() {
  const loading = useCalendarEventDetailStore((state) => state.loading)

  const calendarEvent = useCalendarEventDetailStore(
    (state) => state.calendarEvent
  )
  const getCalendarEvent = useCalendarEventDetailStore(
    (state) => state.getCalendarEvent
  )

  const eventAttendance = useCalendarEventDetailStore(
    (state) => state.eventAttendance
  )
  const getEventAttendance = useCalendarEventDetailStore(
    (state) => state.getEventAttendance
  )

  const userAttendance = useCalendarEventDetailStore(
    (state) => state.userAttendance
  )
  const getUserAttendance = useCalendarEventDetailStore(
    (state) => state.getUserAttendance
  )

  return {
    loading,
    calendarEvent,
    getCalendarEvent,
    eventAttendance,
    getEventAttendance,
    userAttendance,
    getUserAttendance
  }
}
