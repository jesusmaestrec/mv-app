import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

import type { CalendarEvent } from '@/interfaces'
import { EventTypeTag } from '@/components'

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

  return (
    <div className="mb-4 last:mb-0">
      <Link to={`/events/${calendarEvent.id}`} className="group block">
        <article className="flex gap-5 rounded-3xl px-4 py-4 border border-gray-100 bg-white shadow-sm">
          {/* FECHA */}
          <div className="flex w-16 shrink-0 flex-col items-center border-r border-gray-200 pr-5">
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
              {weekday}
            </span>

            <span className="text-4xl font-bold leading-none text-gray-900">
              {day}
            </span>

            <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-gray-400">
              {month}
            </span>
          </div>

          {/* CONTENIDO */}
          <div className="min-w-0 flex-1">
            <div className="mb-2">
              <EventTypeTag eventType={eventType} />
            </div>

            <h3
              className="
              text-lg
              font-semibold
              text-gray-900
              transition-colors
              group-hover:text-primary
            "
            >
              {title}
            </h3>

            {description && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between gap-4">
              {location ? (
                <div className="flex min-w-0 items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              ) : (
                <div />
              )}

              <span
                className="
                shrink-0
                rounded-md
                bg-gray-100
                px-2.5
                py-1
                text-sm
                font-semibold
                text-gray-700
              "
              >
                {time}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}
