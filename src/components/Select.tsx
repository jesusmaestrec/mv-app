import { useState } from 'react'
import { BottomSheet } from './BottomSheet'

type Option = {
  value: string
  label: string
}

type Props = {
  label?: string
  value?: string
  options: Option[]
  placeholder?: string
  onChange: (value: string) => void
}

export const Select = ({
  label,
  value,
  options,
  placeholder = 'Selecciona una opción',
  onChange
}: Props) => {
  const [open, setOpen] = useState(false)

  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <div className="space-y-1 w-full">
      {label && <label className="text-sm text-slate-600">{label}</label>}

      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-left hover:bg-white transition"
      >
        <span className={selectedLabel ? 'text-slate-900' : 'text-slate-400'}>
          {selectedLabel || placeholder}
        </span>

        <span className="text-slate-400">▾</span>
      </button>

      {/* BOTTOM SHEET (REUSABLE COMPONENT) */}
      <BottomSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Selecciona una opción"
      >
        <div className="flex flex-col gap-1">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`px-4 py-3 rounded-2xl text-left text-sm transition active:scale-[0.98] hover:bg-slate-100/60 ${
                value === opt.value
                  ? 'bg-slate-100 font-medium text-slate-900'
                  : 'text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  )
}
