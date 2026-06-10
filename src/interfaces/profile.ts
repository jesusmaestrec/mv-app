export type UserRole = 'musician' | 'admin'

export type InstrumentVoice =
  | 'corneta_1_fuerte_1'
  | 'corneta_1_fuerte_2'
  | 'corneta_1_piano'
  | 'corneta_2'
  | 'trompeta_1a'
  | 'trompeta_1b'
  | 'trompeta_2'
  | 'trompeta_3'
  | 'trombon_1'
  | 'trombon_2'
  | 'bombardino_1'
  | 'bombardino_2'
  | 'tuba'
  | 'tambor'
  | 'bombo'

export interface Profile {
  id: string
  role: UserRole
  name: string
  last_name: string
  voice: InstrumentVoice | null
}

export interface ProfileState {
  profile: Profile | null
  loading: boolean
  getProfile: (id: string) => Promise<void>
}
