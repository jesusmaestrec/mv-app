export interface UserAttendance {
  id: string
  eventId: string
  userId: string
  confirmed: boolean
}

export interface UseUserAttendanceReturn {
  userAttendance: UserAttendance | null
  setUserAttendance: React.Dispatch<React.SetStateAction<UserAttendance | null>>
  loading: boolean
}

export interface EventAttendance {
  total: number
  confirmed: number
  rejected: number
}

export interface UseEventAttendanceReturn {
  getEventAttendance: (eventId?: string) => Promise<void>
  eventAttendance: EventAttendance
  loading: boolean
}
