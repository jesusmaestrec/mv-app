import { useEffect, useRef, useState } from 'react'
import { useAuth, useProfile } from '@/hooks'
import { AppLogo } from './AppLogo'
import { LogOut } from 'lucide-react'

export const AppHeader = () => {
  const { profile } = useProfile()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  const userInitial = profile?.name?.charAt(0).toUpperCase() ?? 'U'

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return

      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4 sm:px-10">
        <AppLogo />

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-sm font-medium text-gray-700"
          >
            {userInitial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.name} {profile?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
