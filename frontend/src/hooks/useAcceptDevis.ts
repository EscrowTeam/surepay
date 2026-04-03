'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { ESCROW_VAULT_ADDRESS, ESCROW_VAULT_ABI, USDC_ADDRESS, ERC20_ABI } from '@/lib/contracts'

// Hook particulier — approve USDC puis accepte le devis (2 transactions séquentielles)
export function useAcceptDevis(chantierId: bigint, depositAmount: bigint, walletAddress: `0x${string}` | undefined) {
  const [step, setStep] = useState<'idle' | 'approving' | 'accepting' | 'done'>('idle')

  // Lecture de l'allowance actuelle
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [walletAddress ?? '0x0', ESCROW_VAULT_ADDRESS],
    query: { enabled: !!walletAddress },
  })

  const { writeContract: writeApprove, data: approveHash, isPending: approvalPending, error: approveError } = useWriteContract()
  const { writeContract: writeAccept, data: acceptHash, isPending: acceptPending, error: acceptError } = useWriteContract()

  const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
    query: {
      enabled: !!approveHash,
    },
  })

  const { isLoading: acceptConfirming, isSuccess: acceptSuccess } = useWaitForTransactionReceipt({
    hash: acceptHash,
  })

  // Étape 1 : approve USDC
  function approve() {
    setStep('approving')
    writeApprove({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [ESCROW_VAULT_ADDRESS, depositAmount],
    })
  }

  // Étape 2 : acceptDevis (à appeler une fois l'approve confirmé)
  function accept(yieldOptIn: boolean) {
    setStep('accepting')
    writeAccept({
      address: ESCROW_VAULT_ADDRESS,
      abi: ESCROW_VAULT_ABI,
      functionName: 'acceptDevis',
      args: [chantierId, yieldOptIn],
    })
  }

  // Vérifie si l'allowance est suffisante (peut passer directement à accept)
  const isAlreadyApproved = allowance !== undefined && (allowance as bigint) >= depositAmount

  if (approveSuccess && step === 'approving') {
    refetchAllowance()
    setStep('idle')
  }

  if (acceptSuccess && step === 'accepting') {
    setStep('done')
  }

  return {
    approve,
    accept,
    isAlreadyApproved,
    step,
    isPending: approvalPending || acceptPending || acceptConfirming,
    isSuccess: acceptSuccess,
    error: approveError ?? acceptError,
    approveHash,
    acceptHash,
  }
}
