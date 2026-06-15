import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

import {
  useAuth,
  useCalendarEventDetail,
  useCreateUserAttendance,
  useUpdateUserAttendance
} from '@/hooks'

export const AttendanceActions = () => {
  const { user } = useAuth()

  const {
    calendarEvent,
    userAttendance,
    getUserAttendance,
    getEventAttendance,
    getEventApplicants
  } = useCalendarEventDetail()

  const { create } = useCreateUserAttendance()
  const { update } = useUpdateUserAttendance()

  const status =
    userAttendance?.confirmed === true
      ? 'confirmed'
      : userAttendance?.confirmed === false
        ? 'rejected'
        : 'none'

  const activeIndex = status === 'confirmed' ? 0 : 1

  const setAttendance = async (value: boolean) => {
    navigator.vibrate?.(8)

    if (!calendarEvent || !user) return

    if (!userAttendance) {
      await create(calendarEvent.id, user.id, value)
    } else {
      await update(userAttendance.id, value)
    }

    getUserAttendance(calendarEvent.id, user.id)
    getEventAttendance(calendarEvent.id)
    getEventApplicants(calendarEvent.id)
  }

  const OPTIONS = [
    {
      key: 'confirmed',
      label: 'Asistiré',
      icon: CheckCircle2,
      value: true
    },
    {
      key: 'rejected',
      label: 'No iré',
      icon: XCircle,
      value: false
    }
  ]

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {/* iOS segmented control (unchanged but polished feel assumed) */}
      <div className="relative flex w-full rounded-3xl bg-gray-200/70 p-1 backdrop-blur-md shadow-sm">
        <motion.div
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 35
          }}
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-3xl bg-white shadow-sm"
          animate={{
            x: activeIndex === 0 ? 0 : '100%'
          }}
        />

        {OPTIONS.map((opt, index) => {
          const isActive = activeIndex === index

          return (
            <motion.button
              key={opt.key}
              onClick={() => setAttendance(opt.value)}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.01 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
              }}
              className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-3xl py-2.5 px-3 text-sm font-medium"
            >
              {/* ICON with subtle motion */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -0.5 : 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 25
                }}
              >
                <opt.icon
                  className={`h-4 w-4 transition-colors
                    ${isActive ? 'text-black' : 'text-gray-500'}
                  `}
                />
              </motion.div>

              {/* LABEL */}
              <span
                className={`transition font-medium
                  ${isActive ? 'text-black' : 'text-gray-500'}
                `}
              >
                {opt.label}
              </span>

              {/* subtle active glow dot (iOS style micro feedback) */}
              {isActive && (
                <motion.span
                  layoutId="activeGlow"
                  className="absolute inset-0 rounded-3xl bg-white/40"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 40
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* footer */}
      <p className="text-xs text-gray-400 text-center">
        Podrás cambiar tu respuesta más tarde.
      </p>
    </div>
  )
}
