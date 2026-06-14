import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  ArrowLeft,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import {
  useUserAttendance,
  useAuth,
  useCalendarEvent,
  useCreateUserAttendance,
  useUpdateUserAttendance,
  useEventAttendance
} from '../hooks'
import { Loading } from '../components'
import { calendarEventLabel } from '../constants'
import { formatDate } from '../helpers'
import { useEffect } from 'react'

export const CalendarEventDetail = () => {
  const { id } = useParams()

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
    if (newAttendance) {
      setUserAttendance(newAttendance)
    }
    if (updatedAttendance) {
      setUserAttendance(updatedAttendance)
    }
    void getEventAttendance(calendarEvent?.id)
  }, [
    newAttendance,
    updatedAttendance,
    setUserAttendance,
    calendarEvent,
    getEventAttendance
  ])

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

  const status = userAttendance
    ? userAttendance.confirmed
      ? 'confirmed'
      : 'rejected'
    : 'pending'

  const attendancePercentage =
    eventAttendance.total > 0
      ? Math.round((eventAttendance.confirmed / eventAttendance.total) * 100)
      : 0

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
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 text-sm text-slate-700">
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

        {description && (
          <div className="flex gap-2">
            <FileText className="h-4 w-4 text-slate-400" />
            <span>{description}</span>
          </div>
        )}
      </div>

      {/* RSVP */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Asistencia
          </h2>

          {status === 'confirmed' && (
            <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
              <CheckCircle2 size={14} />
              Confirmado
            </span>
          )}

          {status === 'rejected' && (
            <span className="flex items-center gap-1 text-rose-600 text-xs font-medium">
              <XCircle size={14} />
              Rechazado
            </span>
          )}

          {status === 'pending' && (
            <span className="text-xs text-slate-400">Sin respuesta</span>
          )}
        </div>

        {/* resumen */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-emerald-50 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">
              {eventAttendance.confirmed}
              <span className="text-slate-400 text-lg">
                /{eventAttendance.total}
              </span>
            </p>
            <p className="text-sm text-emerald-700">Confirmados</p>
          </div>

          <div className="rounded-xl bg-red-50 p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {eventAttendance.rejected}
              <span className="text-slate-400 text-lg">
                /{eventAttendance.total}
              </span>
            </p>
            <p className="text-sm text-red-600">Rechazados</p>
          </div>
        </div>

        {/* progress */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-500">
            <span>{eventAttendance.total} respuestas</span>
            <span>{attendancePercentage}% asistencia</span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-5">
          <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            {/* Confirmar */}
            <button
              onClick={() => {
                if (calendarEvent && user) {
                  if (!userAttendance) {
                    create(calendarEvent.id, user.id, true)
                  } else {
                    update(userAttendance.id, true)
                  }
                }
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition
            ${
              userAttendance?.confirmed
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600'
            }`}
            >
              <CheckCircle2
                size={18}
                className={
                  userAttendance?.confirmed
                    ? 'text-emerald-500'
                    : 'text-slate-400'
                }
              />
              Confirmar
            </button>

            {/* Rechazar */}
            <button
              onClick={() => {
                if (calendarEvent && user) {
                  if (!userAttendance) {
                    create(calendarEvent.id, user.id, false)
                  } else {
                    update(userAttendance.id, false)
                  }
                }
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition
            ${
              !userAttendance?.confirmed
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600'
            }`}
            >
              <XCircle
                size={18}
                className={
                  !userAttendance?.confirmed
                    ? 'text-rose-500'
                    : 'text-slate-400'
                }
              />
              Rechazar
            </button>
          </div>
        </div>

        {/* info */}
        <p className="text-xs text-slate-400">
          Puedes modificar tu respuesta más tarde.
        </p>
      </div>
    </div>
  )
}
