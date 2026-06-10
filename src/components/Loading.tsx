import { Loader2 } from 'lucide-react'

export const Loading = () => {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-blue-600">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      <p className="text-lg font-semibold text-slate-900">Cargando...</p>
    </div>
  )
}
