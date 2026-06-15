import { useState } from 'react'
import { MapPin } from 'lucide-react'

import { Card, Input, Select, Button, DateTimePicker } from '@/components'
import { useCreateCalendarEvent } from '@/hooks'
import type { CalendarEventType, NewCalendarEvent } from '@/interfaces'
import { calendarEventLabel, rehearsalTypes } from '@/constants'
import type { RehearsalTypeKey } from '@/constants/rehearsalTypes'

const initialEvent: NewCalendarEvent = {
  title: '',
  eventType: '',
  voices: [],
  description: '',
  location: '',
  startsAt: ''
}

export const CreateEventPage = () => {
  const { create, loading } = useCreateCalendarEvent()

  const [newEvent, setNewEvent] = useState<NewCalendarEvent>(initialEvent)
  const [rehearsalType, setRehearsalType] = useState<RehearsalTypeKey>()

  const updateNewEvent = (newValues: Partial<NewCalendarEvent>) => {
    setNewEvent((prev) => ({
      ...prev,
      ...newValues
    }))
  }

  const requiredFields = [
    newEvent.eventType,
    rehearsalType,
    newEvent.description,
    newEvent.location,
    newEvent.startsAt
  ]

  const isValid = requiredFields.every((value) => value !== '' && value != null)

  const eventTypeOptions = Object.entries(calendarEventLabel).map(
    ([key, value]) => ({
      value: key,
      label: value
    })
  )

  const rehearsalTypeOptions = Object.entries(rehearsalTypes).map(
    ([key, value]) => ({
      value: key,
      label: value.label
    })
  )

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValid) return

    await create(newEvent)

    setNewEvent(initialEvent)
    setRehearsalType(undefined)
  }

  return (
    <div className="h-full bg-white p-4">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Nuevo evento</h1>
        <p className="text-sm text-gray-500">
          Crea un nuevo evento para la banda
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <Card className="space-y-5 p-4">
          {/* TYPE */}
          <Select
            label="Tipo"
            value={newEvent.eventType ?? ''}
            options={eventTypeOptions}
            onChange={(val) => {
              updateNewEvent({
                eventType: val as CalendarEventType
              })
            }}
          />

          {/* REHEARSAL TYPE */}
          {newEvent.eventType === 'rehearsal' && (
            <Select
              label="Tipo ensayo"
              options={rehearsalTypeOptions}
              value={rehearsalType ?? ''}
              onChange={(val) => {
                const rehearsalKey = val as RehearsalTypeKey
                const option = rehearsalTypes[rehearsalKey]

                setRehearsalType(rehearsalKey)

                updateNewEvent({
                  title: option.label,
                  voices: option.voices
                })
              }}
            />
          )}

          {/* DESCRIPTION */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Descripción</label>

            <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 focus-within:bg-white transition">
              <textarea
                value={newEvent.description ?? ''}
                onChange={(e) =>
                  updateNewEvent({
                    description: e.target.value
                  })
                }
                className="w-full bg-transparent text-sm outline-none resize-none min-h-[90px]"
                placeholder="Detalles del evento..."
              />
            </div>
          </div>

          {/* LOCATION */}
          <Input
            label="Ubicación"
            placeholder="Sala de ensayo / Auditorio..."
            value={newEvent.location ?? ''}
            onChange={(e) =>
              updateNewEvent({
                location: e.target.value
              })
            }
            icon={<MapPin className="h-4 w-4" />}
          />

          {/* DATE */}
          <DateTimePicker
            value={newEvent.startsAt ?? null}
            onChange={(date) =>
              updateNewEvent({
                startsAt: date ? date.toISOString() : ''
              })
            }
          />

          {/* SUBMIT */}
          <Button type="submit" loading={loading} disabled={!isValid}>
            Crear evento
          </Button>
        </Card>
      </form>
    </div>
  )
}
