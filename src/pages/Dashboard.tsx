import { EventItemList } from '../components'
import { voiceLabels } from '../constants'
import { useProfile } from '../hooks'

export const Dashboard = () => {
  const { profile } = useProfile()

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="mb-3 flex flex-col gap-2 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Bienvenido
            </p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {profile ? `Hola, ${profile.name}` : 'Bienvenido a MV App'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {profile && profile.voice ? (
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 border border-slate-200 shadow-sm">
                {profile.role.toUpperCase()} - {voiceLabels[profile.voice]}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                Perfil no disponible
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-slate-600 sm:text-base">
          Aplicación web para gestión interna de la BCT Maestro Valero.
        </p>
      </section>

      <div className="pt-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Eventos
        </h2>
      </div>

      <EventItemList />
    </div>
  )
}
