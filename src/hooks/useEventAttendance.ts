import { useEffect, useState } from 'react'
import { getEventAttendance as getEventAttendanceService } from '@/services'
import type { EventAttendance, UseEventAttendanceReturn } from '@/interfaces'

const initialAttendance: EventAttendance = {
  total: 0,
  confirmed: 0,
  rejected: 0
}

export function useEventAttendance(eventId?: string): UseEventAttendanceReturn {
  const [eventAttendance, setEventAttendance] =
    useState<EventAttendance>(initialAttendance)
  const [loading, setLoading] = useState(true)

  const getEventAttendance = async (eventId?: string) => {
    if (!eventId) {
      setEventAttendance(initialAttendance)
      setLoading(false)
      return
    }

    setLoading(true)
    getEventAttendanceService(eventId)
      .then((data) => {
        setEventAttendance(data)
      })
      .catch(() => {
        setEventAttendance(initialAttendance)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    void getEventAttendance(eventId)
  }, [eventId])

  return {
    getEventAttendance,
    eventAttendance,
    loading
  }
}
