import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth, useCalendarEventDetail } from '@/hooks'

import { EmptyView, Loading } from '@/components'

import { EventHeader } from './EventHeader'
import { EventDescription } from './EventDescription'
import { AttendancePanel } from './AttendancePanel'

export const CalendarEventDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const { loading, calendarEvent, initCalendarEventDetail } =
    useCalendarEventDetail()

  useEffect(() => {
    if (id && user) void initCalendarEventDetail(id, user.id)
  }, [id, user, initCalendarEventDetail])

  if (!calendarEvent) {
    return <EmptyView />
  }

  return (
    <Loading isLoading={loading}>
      <div className="bg-white px-4 py-6 space-y-6">
        <EventHeader />
        <EventDescription />
        <AttendancePanel />
      </div>
    </Loading>
  )
}
