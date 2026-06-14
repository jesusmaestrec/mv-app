import type { ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { useNotificationStore } from '@/store/notificationStore'
import type { NotificationType } from '@/interfaces'

const notificationConfig: Record<
  NotificationType,
  { accent: string; bg: string; icon: ReactNode }
> = {
  success: {
    accent: 'text-emerald-700',
    bg: 'bg-emerald-50',
    icon: <CheckCircle2 className="h-4 w-4" />
  },
  error: {
    accent: 'text-rose-700',
    bg: 'bg-rose-50',
    icon: <AlertTriangle className="h-4 w-4" />
  },
  info: {
    accent: 'text-sky-700',
    bg: 'bg-sky-50',
    icon: <Info className="h-4 w-4" />
  }
}

export function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications)
  const dismissNotification = useNotificationStore(
    (state) => state.dismissNotification
  )

  return (
    <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3 px-2 sm:px-0">
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          className="overflow-hidden rounded-xl border border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl transition duration-150 ease-out"
        >
          <div className="flex items-center gap-3 p-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 ${notificationConfig[type].bg} ${notificationConfig[type].accent}`}
            >
              {notificationConfig[type].icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {type === 'success'
                  ? 'Éxito'
                  : type === 'error'
                    ? 'Error'
                    : 'Info'}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{message}</p>
            </div>

            <button
              type="button"
              onClick={() => dismissNotification(id)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Cerrar notificación"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
