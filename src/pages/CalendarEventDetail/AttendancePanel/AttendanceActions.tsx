import { CheckCircle2, XCircle } from 'lucide-react'

import type { CalendarEvent, AuthUser, UserAttendance } from '@/interfaces'

interface Props {
  event: CalendarEvent
  user: AuthUser | null
  userAttendance?: UserAttendance | null
  create: (eventId: string, userId: string, confirmed: boolean) => void
  update: (id: string, confirmed: boolean) => void
}

export const AttendanceActions = ({
  event,
  user,
  userAttendance,
  create,
  update
}: Props) => {
  const isConfirmed = userAttendance?.confirmed === true
  const isRejected = userAttendance?.confirmed === false

  const handleConfirm = () => {
    if (!user || isConfirmed) return

    if (!userAttendance) {
      create(event.id, user.id, true)
    } else {
      update(userAttendance.id, true)
    }
  }

  const handleReject = () => {
    if (!user || isRejected) return

    if (!userAttendance) {
      create(event.id, user.id, false)
    } else {
      update(userAttendance.id, false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1">
        <button
          onClick={handleConfirm}
          disabled={isConfirmed}
          className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium
            ${
              isConfirmed
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-500 hover:bg-white/70'
            }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          Confirmar
        </button>

        <button
          onClick={handleReject}
          disabled={isRejected}
          className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium
            ${
              isRejected
                ? 'bg-white text-rose-500 shadow-sm'
                : 'text-gray-500 hover:bg-white/70'
            }`}
        >
          <XCircle className="h-4 w-4" />
          Rechazar
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Has registrado tu respuesta para este evento.
      </p>
    </div>
  )
}
