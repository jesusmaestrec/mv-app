import { CheckCircle2, XCircle } from 'lucide-react'
import type { UserAttendance } from '@/interfaces'

interface Props {
  userAttendance?: UserAttendance | null
}

export const AttendanceStatus = ({ userAttendance }: Props) => {
  const isConfirmed = userAttendance?.confirmed === true
  const isRejected = userAttendance?.confirmed === false

  if (isConfirmed) {
    return (
      <span className="text-sm text-emerald-600 flex items-center gap-1">
        <CheckCircle2 className="h-4 w-4" />
        Confirmado
      </span>
    )
  }

  if (isRejected) {
    return (
      <span className="text-sm text-rose-500 flex items-center gap-1">
        <XCircle className="h-4 w-4" />
        Rechazado
      </span>
    )
  }

  return <span className="text-sm text-gray-400">Sin respuesta</span>
}
