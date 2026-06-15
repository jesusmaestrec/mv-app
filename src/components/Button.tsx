import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  loading?: boolean
}

export const Button = ({
  variant = 'primary',
  loading,
  disabled,
  className = '',
  children,
  ...props
}: Props) => {
  const base =
    'w-full rounded-xl py-2.5 text-sm font-medium transition active:scale-[0.98]'

  const variants: Record<Variant, string> = {
    primary: 'bg-gray-900 text-white hover:bg-black',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-rose-500 text-white hover:bg-rose-600',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${base}
        ${variants[variant]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
    >
      {loading ? 'Cargando...' : children}
    </button>
  )
}
