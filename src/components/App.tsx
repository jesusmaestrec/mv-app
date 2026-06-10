import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth, useProfile } from '../hooks'
import { Loading } from './Loading'
import { LogOut } from 'lucide-react'

export const App = () => {
  const { profile, loading } = useProfile()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const userInitial = profile?.name?.charAt(0).toUpperCase() ?? 'U'

  const handleLogout = async () => {
    await logout()
  }

  return loading ? (
    <div className="min-h-screen flex items-center">
      <Loading />
    </div>
  ) : (
    <div className="h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
          MV App
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-300 bg-slate-100 text-sm font-bold uppercase text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="User menu"
          >
            {userInitial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="p-3 border-b border-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  {profile?.name} {profile?.last_name}
                </p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  )
}
