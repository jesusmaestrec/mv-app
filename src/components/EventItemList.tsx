import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useCalendarEventList, useProfile } from '../hooks'
import type { CalendarEvent } from '../interfaces'
import { calendarEventLabel } from '../constants'
import { Loading } from './Loading'
import { formatDate } from '../helpers'

export const EventItem = ({
  calendarEvent
}: {
  calendarEvent: CalendarEvent
}) => {
  const { title, description, location, eventType, startsAt } = calendarEvent

  const typeKey = eventType ?? 'other'
  const typeLabel = calendarEventLabel[typeKey]

  const typeClasses: Record<string, string> = {
    rehearsal: 'bg-emerald-100 text-emerald-800',
    performance: 'bg-indigo-100 text-indigo-800',
    meeting: 'bg-amber-100 text-amber-800',
    other: 'bg-slate-100 text-slate-800'
  }

  const formattedDate = formatDate(startsAt)

  return (
    <Link
      to={`/events/${calendarEvent.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeClasses[typeKey]}`}
          >
            {typeLabel}
          </span>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        </div>
      </div>

      {location && (
        <div className="mt-3 flex items-center text-sm text-slate-500">
          <MapPin className="mr-2 h-4 w-4 text-slate-400" />
          <span>{location}</span>
        </div>
      )}

      {description && (
        <p className="mt-3 text-sm text-slate-700">{description}</p>
      )}

      <p className="mt-4 text-sm font-semibold text-slate-900">
        {formattedDate}
      </p>
    </Link>
  )
}

export const EventItemList = () => {
  const { profile } = useProfile()
  const { calendarEvents, loading } = useCalendarEventList(profile?.voice)

  return (
    <section className="space-y-4">
      {loading ? (
        <Loading />
      ) : (
        calendarEvents?.map((calendarEvent) => (
          <EventItem key={calendarEvent.id} calendarEvent={calendarEvent} />
        ))
      )}
    </section>
  )
}
