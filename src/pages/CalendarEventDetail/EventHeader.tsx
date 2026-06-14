import { Calendar, MapPin } from 'lucide-react'
import { EventTypeTag } from '@/components'
import { formatDate } from '@/helpers'
import type { CalendarEvent } from '@/interfaces'

interface Props {
  event: CalendarEvent
}

export const EventHeader = ({ event }: Props) => {
  const { title, location, eventType, startsAt } = event

  return (
    <div className="flex flex-col space-y-3">
      <EventTypeTag eventType={eventType} />

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
