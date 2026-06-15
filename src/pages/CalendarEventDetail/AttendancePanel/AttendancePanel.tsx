import { AttendanceStatus } from './AttendanceStatus'
import { AttendanceStats } from './AttendanceStats'
import { AttendanceProgress } from './AttendanceProgress'
import { AttendanceActions } from './AttendanceActions'
import { useCalendarEventDetail } from '@/hooks'

export const AttendancePanel = () => {
  const { eventAttendance, userAttendance } = useCalendarEventDetail()

  if (!eventAttendance || !userAttendance) return null

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-4 space-y-5">
      <div>
        <h2 className="text-base font-semibold">Asistencia</h2>
        <p className="text-sm text-gray-500">Estado del evento</p>
      </div>

      <AttendanceStatus />
      <AttendanceStats />
      <AttendanceProgress />

      <AttendanceActions />
    </div>
  )
}
