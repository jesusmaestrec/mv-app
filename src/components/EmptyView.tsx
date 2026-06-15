import { Inbox } from 'lucide-react'

type EmptyStateProps = {
  title?: string
  description?: string
  action?: React.ReactNode
}

export const EmptyView = ({
  title = 'No hay datos',
  description = 'No se encontraron elementos para mostrar.',
  action
}: EmptyStateProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
          <Inbox className="w-5 h-5 text-slate-400" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-slate-900">{title}</p>

          <p className="text-sm text-slate-500">{description}</p>

          {/* Action */}
          {action && <div className="pt-2">{action}</div>}
        </div>
      </div>
    </div>
  )
}
