import { useRehearsalsThisWeek, useProfile, useActivities } from '@/hooks'
import { EmptyView, Loading } from '@/components'
import { EventItem } from './EventItem'

export const EventItemList = () => {
  const { profile } = useProfile()

  const { rehearsalsThisWeek, loading: rehearsalLoading } =
    useRehearsalsThisWeek(profile?.voice)

  const { activities, loading: activityLoading } = useActivities(profile?.voice)

  return (
    <>
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
        Ensayos
      </h2>
      <Loading isLoading={rehearsalLoading} label={null}>
        {rehearsalsThisWeek?.length ? (
          rehearsalsThisWeek.map((calendarEvent) => (
            <EventItem key={calendarEvent.id} calendarEvent={calendarEvent} />
          ))
        ) : (
          <EmptyView />
        )}
      </Loading>

      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
        Eventos
      </h2>
      <Loading isLoading={activityLoading} label={null}>
        {activities?.length ? (
          activities.map((calendarEvent) => (
            <EventItem key={calendarEvent.id} calendarEvent={calendarEvent} />
          ))
        ) : (
          <EmptyView />
        )}
      </Loading>
    </>
  )
}
