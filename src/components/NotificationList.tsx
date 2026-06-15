import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { useNotificationStore } from '@/store/notificationStore'
import type { NotificationType } from '@/interfaces'

const config: Record<
  NotificationType,
  { icon: React.ReactNode; color: string }
> = {
  success: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: 'text-emerald-500'
  },
  error: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-rose-500'
  },
  info: {
    icon: <Info className="h-4 w-4" />,
    color: 'text-sky-500'
  }
}

export function NotificationList() {
  const notifications = useNotificationStore((s) => s.notifications)
  const dismissNotification = useNotificationStore((s) => s.dismissNotification)

  return (
    <div className="fixed top-3 left-0 right-0 z-50 flex flex-col items-center px-3">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence initial={false}>
          {notifications.map((n, index) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.98
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 40
              }}
              className="flex items-center gap-2 rounded-3xl bg-black/90 px-3 py-2 text-white shadow-lg"
              style={{
                zIndex: 1000 - index
              }}
            >
              {/* icon */}
              <div className={config[n.type].color}>{config[n.type].icon}</div>

              {/* message */}
              <p className="flex-1 text-sm leading-tight text-white/90">
                {n.message}
              </p>

              {/* close */}
              <button
                onClick={() => dismissNotification(n.id)}
                className="text-white/40 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
