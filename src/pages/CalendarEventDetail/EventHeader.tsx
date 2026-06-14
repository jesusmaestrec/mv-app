import { Calendar, MapPin } from 'lucide-react'
import { EventTypeTag } from '@/components'
import { formatDate } from '@/helpers'
import { useCalendarEventDetail } from '@/hooks'

export const EventHeader = () => {
  const { calendarEvent } = useCalendarEventDetail()

  if (!calendarEvent) return null

  return (
    <div className="flex flex-col space-y-3">
      <EventTypeTag eventType={calendarEvent.eventType} />

      <h1 className="text-2xl font-semibold text-gray-900">
        {calendarEvent.title}
      </h1>

      <div className="space-y-1 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(calendarEvent.startsAt)}
        </div>

        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {calendarEvent.location}
          </div>
        )}
      </div>
    </div>
  )
}
