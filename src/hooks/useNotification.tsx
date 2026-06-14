import { useNotificationStore } from '@/store'

export function useNotification() {
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  )

  return { showNotification }
}
