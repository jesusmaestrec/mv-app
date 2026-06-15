import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  icon?: React.ReactNode
}

export const Input = ({
  label,
  icon,
  className = '',
  type,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'

  return (
    <div className="space-y-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <div
        className="
          relative
          flex items-center gap-2
          rounded-xl border border-gray-100
          bg-gray-50 px-3 py-2
          focus-within:bg-white
          transition
        "
      >
        {icon && <div className="text-gray-400">{icon}</div>}

        <input
          {...props}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`
            w-full bg-transparent text-sm outline-none
            placeholder:text-gray-400
            ${isPassword ? 'pr-8' : ''}
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-gray-600
            "
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
