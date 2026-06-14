import { useAuth, useProfile } from '@/hooks'
import { User, LogOut, Mail, Settings, Shield } from 'lucide-react'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const { profile } = useProfile()

  return (
    <div>
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="px-4 py-4 flex items-center justify-center">
          <h1 className="text-sm font-semibold text-slate-900">Perfil</h1>
        </div>
      </header>

      {/* CONTENT */}
      <div className="px-4 py-5 space-y-6">
        {/* USER CARD */}
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
              <User className="h-6 w-6 text-slate-500" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {profile?.name ?? 'Usuario'} {profile?.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email ?? 'email@demo.com'}
              </p>
            </div>
          </div>
        </div>

        {/* SETTINGS SECTION */}
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
          {/* row */}
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-slate-50 active:scale-[0.99] transition">
            <Mail className="h-5 w-5 text-slate-500" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-slate-900">
                Información de cuenta
              </span>
              <span className="text-xs text-slate-400">
                Email y datos personales
              </span>
            </div>
          </button>

          <div className="h-px bg-slate-100" />

          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-slate-50 active:scale-[0.99] transition">
            <Settings className="h-5 w-5 text-slate-500" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-slate-900">
                Preferencias
              </span>
              <span className="text-xs text-slate-400">
                Configuración de la app
              </span>
            </div>
          </button>

          <div className="h-px bg-slate-100" />

          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-slate-50 active:scale-[0.99] transition">
            <Shield className="h-5 w-5 text-slate-500" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-slate-900">
                Privacidad
              </span>
              <span className="text-xs text-slate-400">Seguridad y datos</span>
            </div>
          </button>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-rose-50 active:scale-[0.99] transition"
          >
            <LogOut className="h-5 w-5 text-rose-500" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-rose-600">
                Cerrar sesión
              </span>
              <span className="text-xs text-rose-400">Salir de la cuenta</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
