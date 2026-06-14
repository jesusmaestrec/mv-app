import { useState } from 'react'
import { createUserAttendance } from '@/services'
import type { UserAttendance } from '@/interfaces'
import { useNotification } from './useNotification'

export function useCreateUserAttendance() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<UserAttendance | null>(null)

  const { showNotification } = useNotification()

  const create = async (
    eventId: string,
    userId: string,
    confirmed: boolean
  ) => {
    setLoading(true)

    await createUserAttendance(eventId, userId, confirmed)
      .then((result) => {
        showNotification(
          'success',
          `Asistencia ${confirmed ? 'confirmada' : 'rechazada'}`
        )
        setData(result)
      })
      .catch(() => {
        showNotification(
          'error',
          `Error ${confirmed ? 'confirmando' : 'rechazando'} la asistencia`
        )
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    create,
    data,
    loading
  }
}
