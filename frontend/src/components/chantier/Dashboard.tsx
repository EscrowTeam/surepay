'use client'

import { useRouter } from 'next/navigation'
import { Plus, Loader2 } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useChantiersByAddress } from '@/hooks/useChantiersByAddress'
import { StatsBar } from './StatsBar'
import { ChantierAccordionCard } from './ChantierAccordionCard'
import { Button } from '@/components/ui/button'

export function Dashboard() {
  const { address } = useAccount()
  const router = useRouter()
  const { chantierIds, isLoading } = useChantiersByAddress(address)

  return (
    <div className="space-y-6">
      {/* Stats */}
      {chantierIds.length > 0 && <StatsBar chantierIds={chantierIds} />}

      {/* En-tête liste */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Mes chantiers</h2>
        <Button
          onClick={() => router.push('/nouveau-devis')}
          className="bg-[oklch(0.82_0.15_175)] text-black hover:bg-[oklch(0.75_0.15_175)] gap-1.5"
        >
          <Plus className="size-4" /> Nouveau chantier
        </Button>
      </div>

      {/* Liste */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
          <Loader2 className="size-4 animate-spin" />
          Chargement des chantiers...
        </div>
      ) : chantierIds.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/50 py-16 text-center">
          <p className="text-muted-foreground text-sm">Aucun chantier pour le moment.</p>
          <p className="text-xs text-muted-foreground mt-1">
            En tant qu'artisan, créez un devis. En tant que particulier, attendez qu'un artisan vous en soumette un.
          </p>
          <Button
            onClick={() => router.push('/nouveau-devis')}
            variant="outline"
            className="mt-4"
          >
            <Plus className="size-4 mr-1.5" /> Créer mon premier devis
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {chantierIds.map(id => (
            <ChantierAccordionCard
              key={id.toString()}
              chantierId={id}
              walletAddress={address!}
            />
          ))}
        </div>
      )}
    </div>
  )
}
