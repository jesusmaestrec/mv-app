import { useState } from 'react'
import { updateUserAttendance } from '@/services'
import type { UserAttendance } from '@/interfaces'
import { useNotification } from './useNotification'

export function useUpdateUserAttendance() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<UserAttendance | null>(null)

  const { showNotification } = useNotification()

  const update = async (id: string, confirmed: boolean) => {
    setLoading(true)

    await updateUserAttendance(id, confirmed)
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
    update,
    data,
    loading
  }
}
