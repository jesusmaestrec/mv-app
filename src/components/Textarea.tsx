import type { TextareaHTMLAttributes, ReactNode } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  icon?: ReactNode
  className?: string
  autoResize?: boolean
}

export const Textarea = ({
  label,
  icon,
  className = '',
  autoResize = false,
  ...props
}: Props) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <div
        className="
          flex gap-2
          rounded-xl border border-gray-100
          bg-gray-50 px-3 py-2
          focus-within:bg-white
          transition
        "
      >
        {icon && <div className="text-gray-400 pt-1">{icon}</div>}

        <textarea
          {...props}
          rows={props.rows ?? 4}
          className={`
            w-full bg-transparent text-sm outline-none resize-none
            placeholder:text-gray-400
            ${autoResize ? 'overflow-hidden' : ''}
            ${className}
          `}
          onInput={(e) => {
            if (!autoResize) return

            const el = e.currentTarget
            el.style.height = 'auto'
            el.style.height = `${el.scrollHeight}px`
          }}
        />
      </div>
    </div>
  )
}
