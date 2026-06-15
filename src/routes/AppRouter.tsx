import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RouteConfig } from './RouteConfig'

import { useAuthStore, useProfileStore } from '@/store'
import { getCurrentUser, onAuthStateChange } from '@/services'

export function AppRouter() {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let profileLoaded = false

    void (async () => {
      const currentUser = await getCurrentUser()

      useAuthStore.setState({
        user: currentUser,
        loading: false
      })

      if (currentUser?.id) {
        useProfileStore.getState().getProfile(currentUser.id)
        profileLoaded = true
      } else {
        useProfileStore.setState({
          profile: null,
          loading: false
        })
      }

      const { data } = onAuthStateChange((user) => {
        useAuthStore.setState({
          user,
          loading: false
        })

        if (user?.id) {
          if (!profileLoaded) {
            useProfileStore.getState().getProfile(user.id)
            profileLoaded = true
          }
        } else {
          useProfileStore.setState({
            profile: null,
            loading: false
          })
          profileLoaded = false
        }
      })

      unsubscribe = () => data.subscription.unsubscribe()
    })()

    return () => unsubscribe?.()
  }, [])

  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  )
}
