import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export const Loading = ({
  isLoading,
  children,
  label = 'Cargando...'
}: {
  isLoading: boolean
  children: React.ReactNode
  label?: string | null
}) => {
  return (
    <div className="relative w-full">
      {children}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut'
            }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white"
            aria-busy="true"
          >
            {/* content wrapper */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 30
              }}
              className="flex flex-col items-center gap-3"
            >
              {/* spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: 'linear'
                }}
              >
                <Loader2 className="h-7 w-7 text-gray-900" />
              </motion.div>

              {/* label */}
              {label && (
                <p className="text-sm text-gray-600 font-medium">{label}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
