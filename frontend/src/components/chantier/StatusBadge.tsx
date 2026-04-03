import { cn } from '@/lib/utils'
import { ChantierStatus, JalonStatus, CHANTIER_STATUS_LABEL, JALON_STATUS_LABEL } from '@/types/contracts'

const CHANTIER_COLORS: Record<ChantierStatus, string> = {
  [ChantierStatus.DevisSubmitted]: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  [ChantierStatus.DevisRejected]: 'bg-red-500/15 text-red-400 border-red-500/20',
  [ChantierStatus.Active]: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  [ChantierStatus.Paused]: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  [ChantierStatus.InLitige]: 'bg-red-500/15 text-red-400 border-red-500/20',
  [ChantierStatus.Completed]: 'bg-teal-500/15 text-teal-400 border-teal-500/20',
  [ChantierStatus.Cancelled]: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
}

const JALON_COLORS: Record<JalonStatus, string> = {
  [JalonStatus.Pending]: 'text-zinc-500',
  [JalonStatus.Finished]: 'text-blue-400',
  [JalonStatus.Accepted]: 'text-emerald-400',
  [JalonStatus.AcceptedWithReserves]: 'text-amber-400',
  [JalonStatus.PaidWithReserves]: 'text-amber-300',
  [JalonStatus.InLitige]: 'text-red-400',
  [JalonStatus.ReservesLifted]: 'text-teal-400',
}

export function ChantierStatusBadge({ status }: { status: ChantierStatus }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', CHANTIER_COLORS[status])}>
      {CHANTIER_STATUS_LABEL[status]}
    </span>
  )
}

export function JalonStatusLabel({ status }: { status: JalonStatus }) {
  const labels: Record<JalonStatus, string> = {
    [JalonStatus.Pending]: 'En attente',
    [JalonStatus.Finished]: 'Preuve soumise',
    [JalonStatus.Accepted]: 'Validé',
    [JalonStatus.AcceptedWithReserves]: 'Réserves',
    [JalonStatus.PaidWithReserves]: 'Payé partiellement',
    [JalonStatus.InLitige]: 'Contesté',
    [JalonStatus.ReservesLifted]: 'Réserves levées',
  }
  return (
    <span className={cn('text-sm font-medium', JALON_COLORS[status])}>
      {labels[status]}
    </span>
  )
}
