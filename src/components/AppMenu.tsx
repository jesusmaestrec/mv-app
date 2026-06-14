import { useAuth } from '@/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { User, X, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AppMenu = ({ isOpen, onClose }: Props) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
          />

          {/* SHEET */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 520,
              damping: 45
            }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md"
          >
            <div className="rounded-t-3xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
              {/* HANDLE */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="h-1 w-10 rounded-full bg-slate-300/60" />
              </div>

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 transition"
                aria-label="Cerrar menú"
              >
                <X className="h-4 w-4" />
              </button>

              {/* OPTIONS */}
              <div className="px-2 pb-6 pt-1 flex flex-col gap-1">
                {/* PROFILE */}
                <button
                  onClick={() => {
                    navigate('/profile')
                    onClose()
                  }}
                  className="
                    flex items-center gap-3
                    px-4 py-3
                    rounded-2xl
                    text-left
                    transition
                    active:scale-[0.98]
                    hover:bg-slate-100/60
                  "
                >
                  <User className="h-5 w-5 text-slate-500" />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 leading-none">
                      Ir al perfil
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      Ver tu cuenta
                    </span>
                  </div>
                </button>

                {/* DIVIDER */}
                <div className="mx-2 my-1 h-px bg-slate-200/50" />

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    logout()
                    onClose()
                  }}
                  className="
                    flex items-center gap-3
                    px-4 py-3
                    rounded-2xl
                    text-left
                    transition
                    active:scale-[0.98]
                    hover:bg-rose-50/60
                  "
                >
                  <LogOut className="h-5 w-5 text-rose-500" />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-rose-600 leading-none">
                      Cerrar sesión
                    </span>
                    <span className="text-xs text-rose-400 mt-0.5">
                      Salir de la cuenta
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
