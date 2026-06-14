import { Link } from 'react-router-dom'

export const AppLogo = () => {
  return (
    <Link to="/dashboard" className="flex items-center gap-2 select-none">
      {/* ICONO */}
      <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-sm">
        <span className="text-white text-sm font-semibold tracking-tight">
          MV
        </span>
      </div>

      {/* WORDMARK */}
      <div className="flex items-baseline">
        <span className="text-sm font-medium text-gray-900 tracking-tight">
          App
        </span>
      </div>
    </Link>
  )
}
