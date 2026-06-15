import { useState } from 'react'
import { createCalendarEvent } from '@/services'
import type { NewCalendarEvent } from '@/interfaces'
import { useNotification } from './useNotification'

export function useCreateCalendarEvent() {
  const { showNotification } = useNotification()

  const [loading, setLoading] = useState(false)

  const create = async (newCalendarEvent: NewCalendarEvent) => {
    setLoading(true)
    await createCalendarEvent(newCalendarEvent)
      .then(() => {
        showNotification('success', 'Evento creado con exito')
      })
      .catch(() => {
        showNotification('error', 'Error al crear el evento')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { create, loading }
}
