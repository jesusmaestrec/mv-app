import { useEffect, useState } from 'react'
import { getRehearsalsThisWeek } from '@/services'
import type {
  CalendarEvent,
  InstrumentVoice,
  UseRehearsalsThisWeekReturn
} from '@/interfaces'

export function useRehearsalsThisWeek(
  voice?: InstrumentVoice | null
): UseRehearsalsThisWeekReturn {
  const [rehearsalsThisWeek, setRehearsalsThisWeek] = useState<
    CalendarEvent[] | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!voice) {
      setRehearsalsThisWeek(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    getRehearsalsThisWeek(voice)
      .then((data) => {
        setRehearsalsThisWeek(data)
      })
      .catch((err) => {
        const message =
          err instanceof Error
            ? err.message
            : 'Error cargando los eventos del calendario'
        setError(message)
        setRehearsalsThisWeek(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [voice])

  return {
    rehearsalsThisWeek,
    loading,
    error
  }
}
