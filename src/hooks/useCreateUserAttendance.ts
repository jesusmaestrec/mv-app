import { createUserAttendance } from '@/services'
import { useNotification } from './useNotification'

export function useCreateUserAttendance() {
  const { showNotification } = useNotification()

  const create = async (
    eventId: string,
    userId: string,
    confirmed: boolean
  ) => {
    await createUserAttendance(eventId, userId, confirmed)
      .then(() => {
        showNotification(
          'success',
          `Asistencia ${confirmed ? 'confirmada' : 'rechazada'}`
        )
      })
      .catch(() => {
        showNotification(
          'error',
          `Error ${confirmed ? 'confirmando' : 'rechazando'} la asistencia`
        )
      })
  }

  return { create }
}
