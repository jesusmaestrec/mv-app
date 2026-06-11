import { useParams, Link } from 'react-router-dom'
import { MapPin, ArrowLeft, Calendar } from 'lucide-react'
import { useCalendarEvent } from '../hooks'
import { Loading } from '../components'
import { calendarEventLabel } from '../constants'
import { formatDate } from '../helpers'

export const CalendarEventDetail = () => {
  const { id } = useParams()
  const { calendarEvent, loading } = useCalendarEvent(id)

  if (loading) return <Loading />

  if (!calendarEvent) {
    return <div className="p-6 text-slate-500">Evento no encontrado</div>
  }

  const { title, description, location, eventType, startsAt } = calendarEvent

  const typeKey = eventType ?? 'other'
  const typeLabel = calendarEventLabel[typeKey]

  const typeClasses: Record<string, string> = {
    rehearsal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    performance: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    meeting: 'bg-amber-50 text-amber-700 border-amber-200',
    other: 'bg-slate-50 text-slate-700 border-slate-200'
  }

  const formattedDate = formatDate(startsAt)

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* BACK */}
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      {/* HEADER */}
      <div className="space-y-3">
        <span
          className={`inline-flex px-3 py-1 rounded-full border text-xs font-medium ${typeClasses[typeKey]}`}
        >
          {typeLabel}
        </span>

        <h1 className="text-3xl font-bold text-slate-900 leading-tight">
          {title}
        </h1>
      </div>

      {/* META */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>{formattedDate}</span>
        </div>

        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      {description && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Descripción
          </h2>

          <p className="mt-3 text-slate-700 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}
