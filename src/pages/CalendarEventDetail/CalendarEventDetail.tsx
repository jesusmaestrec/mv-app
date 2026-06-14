import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  useAuth,
  useCalendarEvent,
  useUserAttendance,
  useEventAttendance,
  useCreateUserAttendance,
  useUpdateUserAttendance
} from '@/hooks'

import { Loading } from '@/components'

import { EventHeader } from './EventHeader'
import { EventDescription } from './EventDescription'
import { AttendancePanel } from './AttendancePanel'

export const CalendarEventDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()

  const { calendarEvent, loading } = useCalendarEvent(id)

  const { getEventAttendance, eventAttendance } = useEventAttendance(
    calendarEvent?.id
  )

  const { userAttendance, setUserAttendance } = useUserAttendance(
    calendarEvent?.id,
    user?.id
  )

  const { create, data: newAttendance } = useCreateUserAttendance()
  const { update, data: updatedAttendance } = useUpdateUserAttendance()

  useEffect(() => {
    if (newAttendance) setUserAttendance(newAttendance)
    if (updatedAttendance) setUserAttendance(updatedAttendance)

    void getEventAttendance(calendarEvent?.id)
  }, [
    newAttendance,
    updatedAttendance,
    setUserAttendance,
    calendarEvent,
    getEventAttendance
  ])

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-white">
        <Loading />
      </div>
    )
  }

  if (!calendarEvent) {
    return <div className="p-6 text-sm text-gray-400">Evento no encontrado</div>
  }

  return (
    <div className="bg-white px-4 py-6 space-y-6">
      <EventHeader event={calendarEvent} />
      <EventDescription event={calendarEvent} />

      <AttendancePanel
        event={calendarEvent}
        user={user}
        userAttendance={userAttendance}
        eventAttendance={eventAttendance}
        create={create}
        update={update}
      />
    </div>
  )
}
