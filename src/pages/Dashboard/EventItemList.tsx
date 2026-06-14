import { useCalendarEventList, useProfile } from '@/hooks'
import { EmptyView, Loading } from '@/components'
import { EventItem } from './EventItem'

export const EventItemList = () => {
  const { profile } = useProfile()
  const { calendarEvents, loading } = useCalendarEventList(profile?.voice)

  const hasEvents = (calendarEvents?.length ?? 0) > 0

  if (loading) {
    return <Loading />
  }

  if (!hasEvents) {
    return <EmptyView />
  }

  return (
    <section>
      {calendarEvents?.map((calendarEvent) => (
        <div
          key={calendarEvent.id}
          className="rounded-2xl border border-gray-100 bg-white shadow-sm mb-4 last:mb-0"
        >
          <EventItem calendarEvent={calendarEvent} />
        </div>
      ))}
    </section>
  )
}
