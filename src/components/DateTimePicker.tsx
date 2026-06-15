import { useMemo, useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Clock } from 'lucide-react'

import { BottomSheet } from './BottomSheet'
import { Button } from './Button'
import { Calendar } from './Calendar'
import { Card } from './Card'

type Props = {
  value: Date | string | null
  onChange: (date: Date) => void
}

const pad = (n: number) => n.toString().padStart(2, '0')
const DEFAULT_TIME = '20:30'

const parseDate = (value?: Date | string | null) => {
  if (!value) return null
  const d = value instanceof Date ? value : new Date(value)
  return isNaN(d.getTime()) ? null : d
}

export const DateTimePicker = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>(DEFAULT_TIME)

  useEffect(() => {
    const parsed = parseDate(value)

    setSelectedDate(parsed)

    if (parsed) {
      setSelectedTime(`${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`)
    } else {
      setSelectedTime(DEFAULT_TIME)
    }
  }, [value])

  const openPicker = () => setOpen(true)

  const minDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const fullTimeSlots = useMemo(() => {
    return Array.from({ length: 24 }, (_, h) => [
      `${pad(h)}:00`,
      `${pad(h)}:15`,
      `${pad(h)}:30`,
      `${pad(h)}:45`
    ]).flat()
  }, [])

  const quickSlots = ['18:00', '20:30', '21:00']

  const handleDate = (date: Date) => {
    const next = new Date(date)
    const [h, m] = selectedTime.split(':').map(Number)

    next.setHours(h)
    next.setMinutes(m)

    setSelectedDate(next)
  }

  const handleTime = (time: string) => {
    setSelectedTime(time)

    const base = selectedDate ?? new Date()

    const next = new Date(base)
    const [h, m] = time.split(':').map(Number)

    next.setHours(h)
    next.setMinutes(m)

    setSelectedDate(next)
  }

  const confirm = () => {
    if (!selectedDate) return
    onChange(selectedDate)
    setOpen(false)
  }

  const displayValue = selectedDate
    ? selectedDate.toLocaleString('es-ES', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null

  return (
    <>
      {/* INPUT */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Fecha y hora</label>

        <div
          onClick={openPicker}
          className="
            relative flex items-center gap-2
            rounded-xl border border-gray-100
            bg-gray-50 px-3 py-2
            transition cursor-pointer
          "
        >
          <CalendarIcon className="h-4 w-4 text-gray-400" />

          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-400">Fecha y hora</span>

            <span
              className={`text-sm font-medium ${
                selectedDate ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {displayValue ?? 'Selecciona fecha y hora'}
            </span>
          </div>

          <Clock className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* SHEET */}
      <BottomSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Selecciona fecha y hora"
      >
        <div className="pt-2 space-y-5">
          {/* DATE */}
          <Card className="p-3">
            <p className="text-xs text-slate-500 mb-2">Fecha</p>
            <Calendar onSelectDate={handleDate} minDate={minDate} />
          </Card>

          {/* QUICK TIMES */}
          <Card className="p-3">
            <p className="text-xs text-slate-500 mb-2">Horas frecuentes</p>

            <div className="flex gap-2">
              {quickSlots.map((time) => (
                <Button
                  key={time}
                  onClick={() => handleTime(time)}
                  variant={selectedTime === time ? 'primary' : 'secondary'}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Card>

          {/* FULL TIMES */}
          <Card className="p-3">
            <p className="text-xs text-slate-500 mb-2">Hora exacta</p>

            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-2">
              {fullTimeSlots.map((time) => (
                <Button
                  key={time}
                  onClick={() => handleTime(time)}
                  variant={selectedTime === time ? 'primary' : 'secondary'}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Card>

          {/* CONFIRM */}
          <Button type="button" onClick={confirm} disabled={!selectedDate}>
            Confirmar
          </Button>
        </div>
      </BottomSheet>
    </>
  )
}
