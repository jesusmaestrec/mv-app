import { useNavigate } from 'react-router-dom'
import {
  User,
  X,
  LogOut,
  CalendarPlus,
  BarChart3,
  UserPlus
} from 'lucide-react'
import { useAuth } from '@/hooks'
import { BottomSheet } from '@/components'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AppMenu = ({ isOpen, onClose }: Props) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const go = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Menú">
      <div className="flex flex-col gap-1 relative">
        {/* CLOSE (optional, BottomSheet ya permite swipe + backdrop) */}
        <button
          onClick={onClose}
          className="absolute right-2 -top-10 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* PROFILE */}
        <button
          onClick={() => go('/profile')}
          className="flex items-center gap-3 px-4 py-3 rounded-3xl text-left transition active:scale-[0.98] hover:bg-slate-100/60"
        >
          <User className="h-5 w-5 text-slate-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">Perfil</span>
            <span className="text-xs text-slate-400">Ver tu cuenta</span>
          </div>
        </button>

        {/* ADMIN HEADER */}
        <div className="mx-2 mt-2 mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Administración
        </div>

        {/* STATS */}
        <button
          onClick={() => go('/admin/stats')}
          className="flex items-center gap-3 px-4 py-3 rounded-3xl text-left transition active:scale-[0.98] hover:bg-slate-100/60"
        >
          <BarChart3 className="h-5 w-5 text-slate-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              Estadísticas
            </span>
            <span className="text-xs text-slate-400">Métricas de eventos</span>
          </div>
        </button>

        {/* CREATE EVENTS */}
        <button
          onClick={() => go('/admin/events/new')}
          className="flex items-center gap-3 px-4 py-3 rounded-3xl text-left transition active:scale-[0.98] hover:bg-slate-100/60"
        >
          <CalendarPlus className="h-5 w-5 text-slate-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              Crear evento
            </span>
            <span className="text-xs text-slate-400">
              Nuevo evento en el sistema
            </span>
          </div>
        </button>

        {/* USER REGISTRATION */}
        <button
          onClick={() => go('/admin/users/new')}
          className="flex items-center gap-3 px-4 py-3 rounded-3xl text-left transition active:scale-[0.98] hover:bg-slate-100/60"
        >
          <UserPlus className="h-5 w-5 text-slate-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              Registro de usuarios
            </span>
            <span className="text-xs text-slate-400">Crear nuevas cuentas</span>
          </div>
        </button>

        {/* DIVIDER */}
        <div className="mx-2 my-2 h-px bg-slate-200/50" />

        {/* LOGOUT */}
        <button
          onClick={() => {
            logout()
            onClose()
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-3xl text-left transition active:scale-[0.98] hover:bg-rose-50/60"
        >
          <LogOut className="h-5 w-5 text-rose-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-rose-600">
              Cerrar sesión
            </span>
            <span className="text-xs text-rose-400">Salir de la cuenta</span>
          </div>
        </button>
      </div>
    </BottomSheet>
  )
}
