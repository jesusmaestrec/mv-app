import { useEffect, useRef, useState } from 'react'
import { AppLogo } from './AppLogo'
import { Menu } from 'lucide-react'
import { AppMenu } from './AppMenu'

export const AppHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

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
    <>
      <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-2xl border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 sm:px-10">
          <AppLogo />

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition active:scale-95 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <AppMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
