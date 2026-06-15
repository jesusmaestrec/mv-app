import type { InstrumentVoice } from '@/interfaces'

export type RehearsalTypeKey =
  | 'rehearsal_corneta_1'
  | 'rehearsal_armonia'
  | 'rehearsal_percusion'
  | 'rehearsal_general'

export type RehearsalType = {
  label: string
  voices: InstrumentVoice[]
}

const cornetas_1: InstrumentVoice[] = [
  'corneta_1_fuerte_1',
  'corneta_1_fuerte_2',
  'corneta_1_piano'
]

const cornetas_2: InstrumentVoice[] = ['corneta_2']
const trompetas_1: InstrumentVoice[] = ['trompeta_1a', 'trompeta_1b']
const trompetas_2_3: InstrumentVoice[] = ['trompeta_2', 'trompeta_3']
const trombones: InstrumentVoice[] = ['trombon_1', 'trombon_2']
const bombardinos: InstrumentVoice[] = ['bombardino_1', 'bombardino_2']
const tubas: InstrumentVoice[] = ['tuba']
const percusion: InstrumentVoice[] = ['tambor', 'bombo']

const armonia: InstrumentVoice[] = [
  ...cornetas_2,
  ...trompetas_1,
  ...trompetas_2_3,
  ...trombones,
  ...bombardinos,
  ...tubas
]

export const bandaCompleta: InstrumentVoice[] = [
  ...cornetas_1,
  ...cornetas_2,
  ...trompetas_1,
  ...trompetas_2_3,
  ...trombones,
  ...bombardinos,
  ...tubas,
  ...percusion
]

export const rehearsalTypes: Record<RehearsalTypeKey, RehearsalType> = {
  rehearsal_corneta_1: {
    label: 'Ensayo Cornetas 1ª',
    voices: cornetas_1
  },
  rehearsal_armonia: {
    label: 'Ensayo Armonía',
    voices: armonia
  },
  rehearsal_percusion: {
    label: 'Ensayo Percusión',
    voices: percusion
  },
  rehearsal_general: {
    label: 'Ensayo General',
    voices: bandaCompleta
  }
}
