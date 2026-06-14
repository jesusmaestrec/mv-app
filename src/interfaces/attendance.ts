export interface Attendance {
  id: string
  eventId: string
  userId: string
  confirmed: boolean
}

export interface UseAttendanceReturn {
  attendance: Attendance | null
  loading: boolean
}
