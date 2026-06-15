import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CalendarEvent = {
  id: string
  title: string
  startsAt: string
}

type Props = {
  events?: CalendarEvent[]
  onSelectDate?: (date: Date) => void
  minDate?: Date
}

const isBeforeDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() < b.getFullYear() ||
    (a.getFullYear() === b.getFullYear() &&
      (a.getMonth() < b.getMonth() ||
        (a.getMonth() === b.getMonth() && a.getDate() < b.getDate())))
  )
}

export const Calendar = ({ events = [], onSelectDate, minDate }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 0)

  const startDay = startOfMonth.getDay()
  const totalDays = endOfMonth.getDate()

  const eventsByDay = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {}

    events.forEach((event) => {
      const date = new Date(event.startsAt)
      const key = date.toDateString()

      if (!map[key]) map[key] = []
      map[key].push(event)
    })

    return map
  }, [events])

  const days: (Date | null)[] = useMemo(() => {
    const result: (Date | null)[] = []

    for (let i = 0; i < startDay; i++) {
      result.push(null)
    }

    for (let d = 1; d <= totalDays; d++) {
      result.push(new Date(year, month, d))
    }

    return result
  }, [startDay, totalDays, year, month])

  const monthLabel = currentDate.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  })

  const goPrev = () => setCurrentDate(new Date(year, month - 1, 1))
  const goNext = () => setCurrentDate(new Date(year, month + 1, 1))

  const handleSelect = (date: Date) => {
    setSelectedDay(date)
    onSelectDate?.(date)
  }

  return (
    <div className="p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button onClick={goPrev} className="p-2 rounded-lg hover:bg-gray-100">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <h2 className="text-sm font-medium text-gray-900 capitalize">
          {monthLabel}
        </h2>

        <button onClick={goNext} className="p-2 rounded-lg hover:bg-gray-100">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* WEEKDAYS */}
      <div className="grid grid-cols-7 text-center text-[10px] text-gray-400">
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          if (!date) return <div key={idx} className="h-10" />

          const key = date.toDateString()
          const hasEvents = (eventsByDay[key]?.length ?? 0) > 0

          const isSelected = selectedDay?.toDateString() === date.toDateString()

          const isDisabled = minDate ? isBeforeDay(date, minDate) : false

          return (
            <button
              key={idx}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleSelect(date)}
              title={isDisabled ? 'Fecha no disponible' : undefined}
              className={`
                relative h-10 rounded-lg text-sm transition

                ${
                  isDisabled
                    ? 'text-gray-300 opacity-40 cursor-not-allowed'
                    : 'hover:bg-gray-100 text-gray-700'
                }

                ${isSelected ? 'bg-gray-900 text-white' : ''}
              `}
            >
              {date.getDate()}

              {hasEvents && !isDisabled && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <span className="h-1 w-1 rounded-full bg-gray-900 block" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
