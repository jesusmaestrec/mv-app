import { Layers } from 'lucide-react'

export const AppLogo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center bg-white">
        <Layers className="w-4 h-4 text-slate-900" />
      </div>

      {/* Text */}
      <span className="text-sm font-medium text-slate-900 tracking-tight">
        MV <span className="text-slate-500">APP</span>
      </span>
    </div>
  )
}
