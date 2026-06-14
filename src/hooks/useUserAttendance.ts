import { useEffect, useState } from 'react'
import { getUserAttendance } from '../services'
import type { UserAttendance, UseUserAttendanceReturn } from '../interfaces'

export function useUserAttendance(
  eventId?: string,
  userId?: string
): UseUserAttendanceReturn {
  const [userAttendance, setUserAttendance] = useState<UserAttendance | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId || !userId) {
      setUserAttendance(null)
      setLoading(false)
      return
    }

    setLoading(true)
    getUserAttendance(eventId, userId)
      .then((data) => {
        setUserAttendance(data)
      })
      .catch(() => {
        setUserAttendance(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [eventId, userId])

  return {
    userAttendance,
    setUserAttendance,
    loading
  }
}
