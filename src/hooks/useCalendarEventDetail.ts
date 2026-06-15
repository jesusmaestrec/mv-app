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
  const eventApplicants = useCalendarEventDetailStore(
    (state) => state.eventApplicants
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
  const getEventApplicants = useCalendarEventDetailStore(
    (state) => state.getEventApplicants
  )

  return {
    loading,
    calendarEvent,
    eventAttendance,
    userAttendance,
    eventApplicants,
    initCalendarEventDetail,
    getCalendarEvent,
    getEventAttendance,
    getUserAttendance,
    getEventApplicants
  }
}
