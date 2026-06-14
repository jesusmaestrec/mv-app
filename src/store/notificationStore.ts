import { create } from 'zustand'
import type { NotificationState } from '@/interfaces'

const timeoutIds: number[] = []

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  showNotification: (type, message, duration = 2000) => {
    const id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`

    set((state) => ({
      notifications: [...state.notifications, { id, type, message }]
    }))

    if (duration > 0) {
      const timeoutId = window.setTimeout(
        () => get().dismissNotification(id),
        duration
      )
      timeoutIds.push(timeoutId)
    }
  },
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((item) => item.id !== id)
    }))
}))
