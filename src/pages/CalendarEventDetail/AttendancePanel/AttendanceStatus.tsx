import { CheckCircle2, XCircle, Clock } from 'lucide-react'

export const AttendanceStatus = ({
  confirmed
}: {
  confirmed?: boolean | null
}) => {
  const isConfirmed = confirmed === true
  const isRejected = confirmed === false

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

  return (
    <span className="text-sm text-gray-400 flex items-center gap-1">
      <Clock className="h-4 w-4" />
      Pendiente
    </span>
  )
}
