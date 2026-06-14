import { calendarEventLabel } from '@/constants'
import type { CalendarEventType } from '@/interfaces'

export const EventTypeTag = ({
  eventType
}: {
  eventType: CalendarEventType
}) => {
  const typeKey = eventType ?? 'other'
  const typeLabel = calendarEventLabel[typeKey]

  const typeClasses: Record<string, string> = {
    rehearsal: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    performance: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    meeting: 'bg-amber-50 text-amber-700 border-amber-100',
    other: 'bg-gray-50 text-gray-600 border-gray-100'
  }

  return (
    <div
      className={`self-start w-fit inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${typeClasses[typeKey]}`}
    >
      {typeLabel}
    </div>
  )
}
