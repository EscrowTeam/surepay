'use client'

import { useReadContract } from 'wagmi'
import { ESCROW_VAULT_ADDRESS, ESCROW_VAULT_ABI } from '@/lib/contracts'
import { Chantier, Jalon } from '@/types/contracts'

// Lit les données complètes d'un chantier (struct + jalons)
export function useChantier(chantierId: bigint | undefined) {
  const { data: raw, isPending: loadingChantier, refetch: refetchChantier } = useReadContract({
    address: ESCROW_VAULT_ADDRESS,
    abi: ESCROW_VAULT_ABI,
    functionName: 'chantiers',
    args: [chantierId ?? 0n],
    query: { enabled: chantierId !== undefined },
  })

  const { data: jalonsRaw, isPending: loadingJalons, refetch: refetchJalons } = useReadContract({
    address: ESCROW_VAULT_ADDRESS,
    abi: ESCROW_VAULT_ABI,
    functionName: 'getAllJalons',
    args: [chantierId ?? 0n],
    query: { enabled: chantierId !== undefined },
  })

  const chantier: Chantier | undefined = raw
    ? {
        id: raw[0],
        artisan: raw[1],
        particulier: raw[2],
        token: raw[3],
        devisAmount: raw[4],
        depositAmount: raw[5],
        yieldOptIn: raw[6],
        status: raw[7],
        currentJalonIndex: raw[8],
        jalonCount: raw[9],
        submittedAt: raw[10],
        acceptedAt: raw[11],
        completedAt: raw[12],
      }
    : undefined

  const jalons: Jalon[] = (jalonsRaw as Jalon[] | undefined) ?? []

  function refetch() {
    refetchChantier()
    refetchJalons()
  }

  return {
    chantier,
    jalons,
    isLoading: loadingChantier || loadingJalons,
    refetch,
  }
}
