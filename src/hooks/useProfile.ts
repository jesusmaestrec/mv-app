import { useProfileStore } from '../store'

export function useProfile() {
  const profile = useProfileStore((state) => state.profile)
  const loading = useProfileStore((state) => state.loading)
  const getProfile = useProfileStore((state) => state.getProfile)

  return {
    profile,
    loading,
    getProfile
  }
}
