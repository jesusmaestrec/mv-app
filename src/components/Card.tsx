import type { ReactNode } from 'react'

export const Card = ({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`rounded-3xl bg-white rounded-3xl shadow-sm ring-1 ring-black/5 ${className}`}
  >
    {children}
  </div>
)
