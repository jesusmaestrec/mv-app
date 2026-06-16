import { useEffect, useState } from 'react'
import { getActivities } from '@/services'
import type {
  CalendarEvent,
  InstrumentVoice,
  UseActivitiesReturn
} from '@/interfaces'

export function useActivities(
  voice?: InstrumentVoice | null
): UseActivitiesReturn {
  const [activities, setActivities] = useState<CalendarEvent[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!voice) {
      setActivities(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    getActivities(voice)
      .then((data) => {
        setActivities(data)
      })
      .catch((err) => {
        const message =
          err instanceof Error
            ? err.message
            : 'Error cargando los eventos del calendario'
        setError(message)
        setActivities(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [voice])

  return {
    activities,
    loading,
    error
  }
}
