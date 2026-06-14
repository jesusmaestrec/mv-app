import { FileText } from 'lucide-react'
import type { CalendarEvent } from '@/interfaces'

interface Props {
  event: CalendarEvent
}

export const EventDescription = ({ event }: Props) => {
  if (!event.description) return null

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <FileText className="h-4 w-4" />
        Descripción
      </div>

      <p className="text-sm text-gray-600">{event.description}</p>
    </div>
  )
}
