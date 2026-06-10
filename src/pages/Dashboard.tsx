import { useProfile } from '../hooks'
import { Loading } from '../components'

export const Dashboard = () => {
  const { profile, loading } = useProfile()

  const userInitial = profile?.name.charAt(0) ?? 'U'

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
          MV App
        </div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-300 bg-slate-100 text-sm font-bold uppercase text-slate-900">
          {userInitial}
        </div>
      </header>

      <main className="flex flex-1 min-h-0 items-center justify-center p-4 sm:p-6">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Eventos
            </h1>
            <p className="mb-6 text-sm text-slate-600 sm:text-base">
              Aquí tienes los próximos eventos programados para esta semana.
            </p>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-sm text-slate-500">Reunión de equipo</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  Lunes, 10:00
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-sm text-slate-500">
                  Lanzamiento de producto
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  Miércoles, 16:00
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-sm text-slate-500">Revisión mensual</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  Viernes, 14:00
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
