import { create } from 'zustand'
import { getProfile } from '@/services'
import type { ProfileState } from '@/interfaces'

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: true,
  getProfile: async (id) => {
    set({ loading: true })
    const profile = await getProfile(id)
    set({ profile, loading: false })
  }
}))
