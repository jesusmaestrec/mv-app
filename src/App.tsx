import { Outlet } from 'react-router-dom'
import { useProfile } from './hooks'
import { Loading } from './components'
import { AppHeader } from './components/AppHeader'

export const App = () => {
  const { loading } = useProfile()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loading />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <AppHeader />

      <main className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
