import { Outlet } from 'react-router-dom'
import { useProfile } from '../hooks'
import { Loading } from './Loading'

export const App = () => {
  const { profile, loading } = useProfile()

  const userInitial = profile?.name?.charAt(0).toUpperCase() ?? 'U'

  return loading ? (
    <div className="min-h-screen flex items-center">
      <Loading />
    </div>
  ) : (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
          MV App
        </div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-300 bg-slate-100 text-sm font-bold uppercase text-slate-900">
          {userInitial}
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  )
}
