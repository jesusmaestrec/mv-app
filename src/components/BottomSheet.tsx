import type { ReactNode } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'

type Props = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export const BottomSheet = ({ isOpen, onClose, title, children }: Props) => {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
          />

          {/* SHEET */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 480,
              damping: 42
            }}
            drag="y"
            dragDirectionLock
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            dragConstraints={{ top: 0, bottom: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 mb-0 mx-auto w-full max-w-md"
          >
            {/* CARD (AUTO HEIGHT) */}
            <div
              className="
              max-h-[70vh]
              rounded-t-3xl
              bg-white
              shadow-2xl
              ring-1 ring-black/5
              overflow-hidden
              flex flex-col
            "
            >
              {/* HANDLE */}
              <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                <div className="h-1 w-10 rounded-full bg-slate-300/60" />
              </div>

              {/* TITLE */}
              {title && (
                <div className="px-4 pb-2 text-sm font-medium text-slate-500">
                  {title}
                </div>
              )}

              {/* CONTENT */}
              <div
                className="
                px-2 pb-3
                overflow-y-auto
                flex flex-col gap-1
              "
              >
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
