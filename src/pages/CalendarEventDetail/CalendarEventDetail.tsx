import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth, useCalendarEventDetail } from '@/hooks'

import { EmptyView, Loading } from '@/components'

import { EventHeader } from './EventHeader'
import { EventDescription } from './EventDescription'
import { AttendancePanel } from './AttendancePanel'
import { EventApplicants } from './EventApplicants'

export const CalendarEventDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const { loading, calendarEvent, initCalendarEventDetail } =
    useCalendarEventDetail()

  useEffect(() => {
    if (id && user) void initCalendarEventDetail(id, user.id)
  }, [id, user, initCalendarEventDetail])

  return (
    <div className="h-full">
      <Loading isLoading={loading}>
        {!calendarEvent ? (
          <EmptyView />
        ) : (
          <div className="bg-white px-4 py-6 space-y-6">
            <EventHeader />
            <EventDescription />
            <AttendancePanel />
            <EventApplicants />
          </div>
        )}
      </Loading>
    </div>
  )
}
