import { updateUserAttendance } from '@/services'
import { useNotification } from './useNotification'

export function useUpdateUserAttendance() {
  const { showNotification } = useNotification()

  const update = async (id: string, confirmed: boolean) => {
    await updateUserAttendance(id, confirmed)
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

  return { update }
}
