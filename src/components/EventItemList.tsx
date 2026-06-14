import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useCalendarEventList, useProfile } from '@/hooks'
import type { CalendarEvent } from '@/interfaces'
import { calendarEventLabel } from '@/constants'
import { Loading } from './Loading'
import { EmptyView } from './EmptyView'

export const EventItem = ({
  calendarEvent
}: {
  calendarEvent: CalendarEvent
}) => {
  const { title, description, location, eventType, startsAt } = calendarEvent

  const date = new Date(startsAt)

  const weekday = date
    .toLocaleDateString('es-ES', {
      weekday: 'short'
    })
    .replace('.', '')
    .toUpperCase()

  const day = date.toLocaleDateString('es-ES', {
    day: '2-digit'
  })

  const month = date
    .toLocaleDateString('es-ES', {
      month: 'short'
    })
    .replace('.', '')
    .toUpperCase()

  const time = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const typeKey = eventType ?? 'other'
  const typeLabel = calendarEventLabel[typeKey]

  return (
    <Link to={`/events/${calendarEvent.id}`} className="group block">
      <div className="flex gap-5 rounded-2xl px-4 py-4 transition-colors hover:bg-gray-50">
        {/* FECHA */}
        <div className="w-16 shrink-0 text-center">
          <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
            {weekday}
          </p>

          <p className="text-3xl font-semibold tracking-tight text-gray-900 leading-none">
            {day}
          </p>

          <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-gray-400">
            {month}
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider text-gray-400">
              {typeLabel}
            </span>
          </div>

          <h3 className="text-base font-medium text-gray-900">{title}</h3>

          {description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}

            <span className="font-medium text-gray-700">{time}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

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
