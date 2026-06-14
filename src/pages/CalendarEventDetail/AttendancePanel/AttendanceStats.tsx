import type { EventAttendance } from '@/interfaces'

interface Props {
  eventAttendance: EventAttendance
}

export const AttendanceStats = ({ eventAttendance }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-gray-50 p-3 text-center">
        <p className="text-2xl font-semibold text-emerald-600">
          {eventAttendance.confirmed}
        </p>
        <p className="text-xs text-gray-500">Confirmados</p>
      </div>

      <div className="rounded-xl bg-gray-50 p-3 text-center">
        <p className="text-2xl font-semibold text-rose-500">
          {eventAttendance.rejected}
        </p>
        <p className="text-xs text-gray-500">Rechazados</p>
      </div>
    </div>
  )
}
