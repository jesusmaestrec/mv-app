import { voiceLabels } from '../constants/voiceLabels'
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
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
            {profile && profile.role && profile.voice
              ? `${profile.role.toUpperCase()} - ${voiceLabels[profile.voice]}`
              : 'Perfil no disponible'}
          </div>
        </div>
        <p className="text-sm text-slate-600 sm:text-base">
          Aquí tienes los próximos eventos programados para esta semana.
        </p>
      </section>

      <section className="space-y-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm text-slate-500">Reunión de equipo</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            Lunes, 10:00
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm text-slate-500">Lanzamiento de producto</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            Miércoles, 16:00
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-sm text-slate-500">Revisión mensual</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            Viernes, 14:00
          </p>
        </article>
      </section>
    </div>
  )
}
