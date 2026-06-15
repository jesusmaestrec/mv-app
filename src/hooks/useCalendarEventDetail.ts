import { useCalendarEventDetailStore } from '@/store'

export function useCalendarEventDetail() {
  const loading = useCalendarEventDetailStore((state) => state.loading)

  const calendarEvent = useCalendarEventDetailStore(
    (state) => state.calendarEvent
  )
  const eventAttendance = useCalendarEventDetailStore(
    (state) => state.eventAttendance
  )
  const userAttendance = useCalendarEventDetailStore(
    (state) => state.userAttendance
  )

  const initCalendarEventDetail = useCalendarEventDetailStore(
    (state) => state.initCalendarEventDetail
  )

  const getCalendarEvent = useCalendarEventDetailStore(
    (state) => state.getCalendarEvent
  )
  const getEventAttendance = useCalendarEventDetailStore(
    (state) => state.getEventAttendance
  )
  const getUserAttendance = useCalendarEventDetailStore(
    (state) => state.getUserAttendance
  )

  return {
    loading,
    calendarEvent,
    eventAttendance,
    userAttendance,
    initCalendarEventDetail,
    getCalendarEvent,
    getEventAttendance,
    getUserAttendance
  }
}
