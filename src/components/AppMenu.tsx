import { useNavigate } from 'react-router-dom'
import { User, X, LogOut, CalendarPlus, BarChart3, Home } from 'lucide-react'
import { useAuth, useProfile } from '@/hooks'
import { BottomSheet } from '@/components'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type MenuItem = {
  label: string
  description: string
  icon: React.ElementType
  path?: string
  onClick?: () => void
  variant?: 'default' | 'danger'
}

const Item = ({
  item,
  onNavigate
}: {
  item?: MenuItem
  onNavigate: (path?: string) => void
}) => {
  if (!item) return null

  const Icon = item.icon

  return (
    <button
      onClick={() => {
        if (item.onClick) item.onClick()
        else onNavigate(item.path)
      }}
      className={[
        'flex items-center gap-3 px-4 py-3 rounded-3xl text-left transition active:scale-[0.98]',
        item.variant === 'danger'
          ? 'hover:bg-rose-50/60'
          : 'hover:bg-slate-100/60'
      ].join(' ')}
    >
      <Icon
        className={`h-5 w-5 ${
          item.variant === 'danger' ? 'text-rose-500' : 'text-slate-500'
        }`}
      />

      <div className="flex flex-col">
        <span
          className={`text-sm font-medium ${
            item.variant === 'danger' ? 'text-rose-600' : 'text-slate-900'
          }`}
        >
          {item.label}
        </span>
        <span
          className={`text-xs ${
            item.variant === 'danger' ? 'text-rose-400' : 'text-slate-400'
          }`}
        >
          {item.description}
        </span>
      </div>
    </button>
  )
}

export const AppMenu = ({ isOpen, onClose }: Props) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { profile } = useProfile()

  const isAdmin = profile?.role === 'admin'

  const go = (path?: string) => {
    if (!path) return
    navigate(path)
    onClose()
  }

  const baseItems: MenuItem[] = [
    {
      label: 'Inicio',
      description: 'Pantalla principal',
      icon: Home,
      path: '/'
    },
    {
      label: 'Perfil',
      description: 'Ver tu cuenta',
      icon: User,
      path: '/profile'
    }
  ]

  const adminItems: MenuItem[] = [
    {
      label: 'Estadísticas',
      description: 'Métricas de eventos',
      icon: BarChart3,
      path: '/admin/stats'
    },
    {
      label: 'Crear evento',
      description: 'Nuevo evento en el sistema',
      icon: CalendarPlus,
      path: '/admin/events/new'
    }
  ]

  const items: MenuItem[] = [
    ...baseItems,
    ...(isAdmin ? adminItems : []),
    {
      label: 'Cerrar sesión',
      description: 'Salir de la cuenta',
      icon: LogOut,
      variant: 'danger',
      onClick: () => {
        logout()
        onClose()
      }
    }
  ]

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Menú">
      <div className="flex flex-col gap-1 relative">
        <button
          onClick={onClose}
          className="absolute right-2 -top-10 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {items.map((item) => (
          <Item key={item.label} item={item} onNavigate={go} />
        ))}
      </div>
    </BottomSheet>
  )
}
