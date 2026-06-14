import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth, useCalendarEventDetail } from '@/hooks'

import { Loading } from '@/components'

import { EventHeader } from './EventHeader'
import { EventDescription } from './EventDescription'
import { AttendancePanel } from './AttendancePanel'

export const CalendarEventDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const {
    loading,
    calendarEvent,
    getCalendarEvent,
    getEventAttendance,
    getUserAttendance
  } = useCalendarEventDetail()

  useEffect(() => {
    if (id) void getCalendarEvent(id)
  }, [id, getCalendarEvent])

  useEffect(() => {
    if (calendarEvent) {
      void getEventAttendance(calendarEvent.id)
      if (user) {
        void getUserAttendance(calendarEvent.id, user.id)
      }
    }
  }, [calendarEvent, user, getEventAttendance, getUserAttendance])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <Loading />
      </div>
    )
  }

  if (!calendarEvent) {
    return <div className="p-6 text-sm text-gray-400">Evento no encontrado</div>
  }

  return (
    <div className="bg-white px-4 py-6 space-y-6">
      <EventHeader />
      <EventDescription />
      <AttendancePanel />
    </div>
  )
}
