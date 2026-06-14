import { useParams } from 'react-router-dom'
import { MapPin, Calendar, FileText, CheckCircle2, XCircle } from 'lucide-react'

import {
  useUserAttendance,
  useAuth,
  useCalendarEvent,
  useCreateUserAttendance,
  useUpdateUserAttendance,
  useEventAttendance
} from '../hooks'

import { BackButton, Loading } from '../components'
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
    if (newAttendance) setUserAttendance(newAttendance)
    if (updatedAttendance) setUserAttendance(updatedAttendance)
    void getEventAttendance(calendarEvent?.id)
  }, [
    newAttendance,
    updatedAttendance,
    setUserAttendance,
    calendarEvent,
    getEventAttendance
  ])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loading />
      </div>
    )
  }

  if (!calendarEvent) {
    return <div className="p-6 text-sm text-gray-400">Evento no encontrado</div>
  }

  const { title, description, location, eventType, startsAt } = calendarEvent

  const typeKey = eventType ?? 'other'
  const typeLabel = calendarEventLabel[typeKey]

  const typeClasses: Record<string, string> = {
    rehearsal: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    performance: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    meeting: 'bg-amber-50 text-amber-700 border-amber-100',
    other: 'bg-gray-50 text-gray-600 border-gray-100'
  }

  const formattedDate = formatDate(startsAt)

  const isConfirmed = userAttendance?.confirmed === true
  const isRejected = userAttendance?.confirmed === false

  const confirmed = eventAttendance.confirmed
  const rejected = eventAttendance.rejected
  const total = eventAttendance.total
  const responded = confirmed + rejected

  const attendancePercentage =
    total > 0 ? Math.round((confirmed / total) * 100) : 0

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 space-y-6">
        {/* BACK */}
        <BackButton />

        {/* HEADER */}
        <div className="space-y-3">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${typeClasses[typeKey]}`}
          >
            {typeLabel}
          </span>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 leading-snug">
            {title}
          </h1>

          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </div>

            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        {description && (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <FileText className="h-4 w-4" />
              Descripción
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {/* ASISTENCIA */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-5">
          {/* TITLE */}
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Asistencia
            </h2>
            <p className="text-sm text-gray-500">Estado del evento</p>
          </div>

          {/* STATUS */}
          <div>
            {isConfirmed && (
              <span className="inline-flex items-center gap-1 text-sm text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Confirmado
              </span>
            )}

            {isRejected && (
              <span className="inline-flex items-center gap-1 text-sm text-rose-500">
                <XCircle className="h-4 w-4" />
                Rechazado
              </span>
            )}

            {!userAttendance && (
              <span className="text-sm text-gray-400">Sin respuesta</span>
            )}
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-2xl font-semibold text-emerald-600">
                {confirmed}
              </p>
              <p className="text-xs text-gray-500">Confirmados</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <p className="text-2xl font-semibold text-rose-500">{rejected}</p>
              <p className="text-xs text-gray-500">Rechazados</p>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="space-y-2">
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${attendancePercentage}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-gray-400">
              <span>
                {responded}/{total} respuestas
              </span>
              <span>{attendancePercentage}%</span>
            </div>
          </div>

          {/* SEGMENTED CONTROL BLOQUEADO */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1">
              {/* CONFIRMAR */}
              <button
                onClick={() => {
                  if (!isConfirmed && calendarEvent && user) {
                    if (!userAttendance) {
                      create(calendarEvent.id, user.id, true)
                    } else {
                      update(userAttendance.id, true)
                    }
                  }
                }}
                disabled={isConfirmed}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition
                  ${
                    isConfirmed
                      ? 'bg-white shadow-sm text-emerald-600 cursor-default'
                      : 'text-gray-500 hover:bg-white/70'
                  }
                `}
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmar
              </button>

              {/* RECHAZAR */}
              <button
                onClick={() => {
                  if (!isRejected && calendarEvent && user) {
                    if (!userAttendance) {
                      create(calendarEvent.id, user.id, false)
                    } else {
                      update(userAttendance.id, false)
                    }
                  }
                }}
                disabled={isRejected}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition
                  ${
                    isRejected
                      ? 'bg-white shadow-sm text-rose-500 cursor-default'
                      : 'text-gray-500 hover:bg-white/70'
                  }
                `}
              >
                <XCircle className="h-4 w-4" />
                Rechazar
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              Has registrado tu respuesta para este evento.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
