import { useEffect, useState } from 'react'
import { getCalendarEvent } from '../services'
import type { CalendarEvent, UseCalendarEventReturn } from '../interfaces'

export function useCalendarEvent(id?: string): UseCalendarEventReturn {
  const [calendarEvent, setCalendarEvent] = useState<CalendarEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setCalendarEvent(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    getCalendarEvent(id)
      .then((data) => {
        setCalendarEvent(data)
      })
      .catch((err) => {
        const message =
          err instanceof Error
            ? err.message
            : 'Error cargando el evento del calendario'
        setError(message)
        setCalendarEvent(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return {
    calendarEvent,
    loading,
    error
  }
}
