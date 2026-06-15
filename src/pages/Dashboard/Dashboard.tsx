import { voiceLabels } from '@/constants'
import { useProfile } from '@/hooks'
import { EventItemList } from './EventItemList'

export const Dashboard = () => {
  const { profile } = useProfile()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      {/* HERO */}
      <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Bienvenido
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">
              {profile ? `Hola, ${profile.name}` : 'Bienvenido a MV App'}
            </h1>

            {profile && (
              <p className="mt-2 text-base text-gray-500">
                {profile.role.toUpperCase()}
                {profile.voice && (
                  <>
                    {' · '}
                    {voiceLabels[profile.voice]}
                  </>
                )}
              </p>
            )}
          </div>

          <p className="max-w-md text-sm leading-relaxed text-gray-500">
            Aplicación web para gestión interna de la BCT Maestro Valero.
          </p>
        </div>
      </section>

      {/* EVENTOS */}
      <section className="space-y-4">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
          Eventos
        </h2>

        <EventItemList />
      </section>
    </div>
  )
}
