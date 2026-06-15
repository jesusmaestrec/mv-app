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

export const rehearsalTypes: Record<RehearsalTypeKey, RehearsalType> = {
  rehearsal_corneta_1: {
    label: 'Ensayo Cornetas 1ª',
    voices: ['corneta_1_fuerte_1', 'corneta_1_fuerte_2', 'corneta_1_piano']
  },
  rehearsal_armonia: {
    label: 'Ensayo Armonía',
    voices: [
      'corneta_2',
      'trompeta_1a',
      'trompeta_1b',
      'trompeta_2',
      'trompeta_3',
      'trombon_1',
      'trombon_2',
      'bombardino_1',
      'bombardino_2',
      'tuba'
    ]
  },
  rehearsal_percusion: {
    label: 'Ensayo Percusión',
    voices: ['tambor', 'bombo']
  },
  rehearsal_general: {
    label: 'Ensayo General',
    voices: [
      'corneta_1_fuerte_1',
      'corneta_1_fuerte_2',
      'corneta_1_piano',
      'corneta_2',
      'trompeta_1a',
      'trompeta_1b',
      'trompeta_2',
      'trompeta_3',
      'trombon_1',
      'trombon_2',
      'bombardino_1',
      'bombardino_2',
      'tuba',
      'tambor',
      'bombo'
    ]
  }
}
