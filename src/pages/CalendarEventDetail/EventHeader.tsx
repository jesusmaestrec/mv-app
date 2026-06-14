import { Calendar, MapPin } from 'lucide-react'
import { calendarEventLabel } from '@/constants'
import { formatDate } from '@/helpers'

import type { CalendarEvent } from '@/interfaces'

interface Props {
  event: CalendarEvent
}

export const EventHeader = ({ event }: Props) => {
  const { title, location, eventType, startsAt } = event

  const typeKey = eventType ?? 'other'
  const typeLabel = calendarEventLabel[typeKey]

  const typeClasses: Record<string, string> = {
    rehearsal: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    performance: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    meeting: 'bg-amber-50 text-amber-700 border-amber-100',
    other: 'bg-gray-50 text-gray-600 border-gray-100'
  }

  return (
    <div className="flex flex-col space-y-3">
      <div
        className={`self-start w-fit inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${typeClasses[typeKey]}`}
      >
        {typeLabel}
      </div>

      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

      <div className="space-y-1 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(startsAt)}
        </div>

        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        )}
      </div>
    </div>
  )
}
