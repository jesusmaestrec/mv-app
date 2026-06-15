import { useCalendarEventList, useProfile } from '@/hooks'
import { EmptyView, Loading } from '@/components'
import { EventItem } from './EventItem'

export const EventItemList = () => {
  const { profile } = useProfile()
  const { calendarEvents, loading } = useCalendarEventList(profile?.voice)

  const hasEvents = (calendarEvents?.length ?? 0) > 0

  if (!hasEvents) {
    return <EmptyView />
  }

  return (
    <section>
      <Loading isLoading={loading} label={null}>
        {calendarEvents?.map((calendarEvent) => (
          <EventItem calendarEvent={calendarEvent} />
        ))}
      </Loading>
    </section>
  )
}
