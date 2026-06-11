import { useEffect, useState } from 'react'
import { getCalendarEventList } from '../services'
import type {
  CalendarEvent,
  InstrumentVoice,
  UseCalendarEventListReturn
} from '../interfaces'

export function useCalendarEventList(
  voice?: InstrumentVoice | null
): UseCalendarEventListReturn {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!voice) {
      setCalendarEvents(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    getCalendarEventList(voice)
      .then((data) => {
        setCalendarEvents(data)
      })
      .catch((err) => {
        const message =
          err instanceof Error
            ? err.message
            : 'Error cargando los eventos del calendario'
        setError(message)
        setCalendarEvents(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [voice])

  return {
    calendarEvents,
    loading,
    error
  }
}
