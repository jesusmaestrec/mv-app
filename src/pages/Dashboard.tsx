import { EventItemList } from '../components'
import { voiceLabels } from '../constants'
import { useProfile } from '../hooks'

export const Dashboard = () => {
  const { profile } = useProfile()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      {/* HERO SECTION */}
      <section className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* TEXT */}
          <div className="space-y-2">
            <p className="text-xs tracking-widest uppercase text-gray-400">
              Bienvenido
            </p>

            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
              {profile ? `Hola, ${profile.name}` : 'Bienvenido a MV App'}
            </h1>

            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              Aplicación web para gestión interna de la BCT Maestro Valero.
            </p>
          </div>

          {/* BADGE */}
          <div className="shrink-0">
            {profile && profile.voice ? (
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700">
                {profile.role.toUpperCase()} · {voiceLabels[profile.voice]}
              </div>
            ) : (
              <div className="inline-flex items-center rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-sm text-gray-400">
                Perfil no disponible
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION TITLE */}
      <div className="space-y-1">
        <h2 className="text-xs font-medium tracking-widest uppercase text-gray-400">
          Eventos
        </h2>
      </div>

      {/* LIST */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <EventItemList />
      </div>
    </div>
  )
}
