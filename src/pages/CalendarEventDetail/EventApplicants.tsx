import { Card } from '@/components'
import { voiceLabels } from '@/constants'
import { useCalendarEventDetail } from '@/hooks'
import { User } from 'lucide-react'
import { AttendanceStatus } from './AttendancePanel/AttendanceStatus'

export const EventApplicants = () => {
  const { eventApplicants } = useCalendarEventDetail()

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {/* header small */}
      <p className="text-xs font-medium text-gray-400 px-1">Participantes</p>

      {/* list */}
      <Card className="p-0">
        {eventApplicants.map((applicant, index) => {
          const isLast = index === eventApplicants.length - 1

          return (
            <div
              key={applicant.id}
              className={`
                flex items-center gap-3 px-4 py-3
                ${!isLast ? 'border-b border-gray-100' : ''}
              `}
            >
              {/* avatar */}
              <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-500" />
              </div>

              {/* info */}
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {applicant.name} {applicant.lastName}
                </p>
                <p className="text-xs text-gray-400">
                  {voiceLabels[applicant.voice]}
                </p>
              </div>

              {/* status */}
              <AttendanceStatus confirmed={applicant.confirmed} />
            </div>
          )
        })}
      </Card>
    </div>
  )
}
