import { Outlet } from 'react-router-dom'
import { useProfile } from './hooks'
import { Loading } from './components'
import { AppHeader } from './components/AppHeader'

export const App = () => {
  const { loading } = useProfile()

  return (
    <Loading isLoading={loading}>
      <div className="h-dvh flex flex-col bg-white text-gray-900 overflow-hidden">
        {/* HEADER (siempre fijo) */}
        <AppHeader />

        {/* SCROLL AREA (solo esta zona scrollea) */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <div className="min-h-dvh mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </Loading>
  )
}
