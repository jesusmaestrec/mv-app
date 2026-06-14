import type {
  CalendarEvent,
  AuthUser,
  UserAttendance,
  EventAttendance
} from '@/interfaces'

import { AttendanceStatus } from './AttendanceStatus'
import { AttendanceStats } from './AttendanceStats'
import { AttendanceProgress } from './AttendanceProgress'
import { AttendanceActions } from './AttendanceActions'

interface Props {
  event: CalendarEvent
  user: AuthUser | null
  userAttendance?: UserAttendance | null
  eventAttendance?: EventAttendance
  create: (eventId: string, userId: string, confirmed: boolean) => void
  update: (id: string, confirmed: boolean) => void
}

export const AttendancePanel = ({
  event,
  user,
  userAttendance,
  eventAttendance,
  create,
  update
}: Props) => {
  if (!eventAttendance) return null

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-5">
      <div>
        <h2 className="text-base font-semibold">Asistencia</h2>
        <p className="text-sm text-gray-500">Estado del evento</p>
      </div>

      <AttendanceStatus userAttendance={userAttendance} />
      <AttendanceStats eventAttendance={eventAttendance} />
      <AttendanceProgress eventAttendance={eventAttendance} />

      <AttendanceActions
        event={event}
        user={user}
        userAttendance={userAttendance}
        create={create}
        update={update}
      />
    </div>
  )
}
