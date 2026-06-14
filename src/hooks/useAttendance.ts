import { useEffect, useState } from 'react'
import { getAttendance } from '../services'
import type { Attendance, UseAttendanceReturn } from '../interfaces'

export function useAttendance(
  eventId?: string,
  userId?: string
): UseAttendanceReturn {
  const [attendance, setAttendance] = useState<Attendance | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId || !userId) {
      setAttendance(null)
      setLoading(false)
      return
    }

    setLoading(true)
    getAttendance(eventId, userId)
      .then((data) => {
        setAttendance(data)
      })
      .catch(() => {
        setAttendance(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [eventId, userId])

  return {
    attendance,
    loading
  }
}
