import { AttendanceStatus } from './AttendanceStatus'
import { AttendanceStats } from './AttendanceStats'
import { AttendanceProgress } from './AttendanceProgress'
import { AttendanceActions } from './AttendanceActions'
import { useCalendarEventDetail } from '@/hooks'
import { Card } from '@/components'

export const AttendancePanel = () => {
  const { eventAttendance, userAttendance } = useCalendarEventDetail()

  if (!eventAttendance) return null

  return (
    <Card className="p-4 space-y-5">
      <div>
        <h2 className="text-base font-semibold">Asistencia</h2>
        <p className="text-sm text-gray-500">Estado del evento</p>
      </div>

      <AttendanceStatus confirmed={userAttendance?.confirmed} />
      <AttendanceStats />
      <AttendanceProgress />

      <AttendanceActions />
    </Card>
  )
}
