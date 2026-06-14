import type { EventAttendance } from '@/interfaces'

interface Props {
  eventAttendance: EventAttendance
}

export const AttendanceProgress = ({ eventAttendance }: Props) => {
  const responded = eventAttendance.confirmed + eventAttendance.rejected

  const percentage =
    eventAttendance.total > 0
      ? Math.round((eventAttendance.confirmed / eventAttendance.total) * 100)
      : 0

  return (
    <div className="space-y-2">
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-emerald-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-[11px] text-gray-400">
        <span>
          {responded}/{eventAttendance.total} respuestas
        </span>
        <span>{percentage}%</span>
      </div>
    </div>
  )
}
