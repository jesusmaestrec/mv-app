import { FileText } from 'lucide-react'
import { useCalendarEventDetail } from '@/hooks'

export const EventDescription = () => {
  const { calendarEvent } = useCalendarEventDetail()

  if (!calendarEvent) return null

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <FileText className="h-4 w-4" />
        Descripción
      </div>

      <p className="text-sm text-gray-600">{calendarEvent.description}</p>
    </div>
  )
}
