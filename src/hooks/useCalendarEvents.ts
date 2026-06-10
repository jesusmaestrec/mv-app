import { useEffect, useState } from 'react'
import { getCalendarEvents } from '../services'
import type {
  CalendarEvent,
  InstrumentVoice,
  UseCalendarEventsReturn
} from '../interfaces'

export function useCalendarEvents(
  voice: InstrumentVoice | null
): UseCalendarEventsReturn {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    if (!voice) {
      setCalendarEvents(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getCalendarEvents(voice)
      setCalendarEvents(data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error fetching calendar events'
      setError(message)
      setCalendarEvents(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchEvents()
  }, [voice])

  return {
    calendarEvents,
    loading,
    error,
    refetch: fetchEvents
  }
}
