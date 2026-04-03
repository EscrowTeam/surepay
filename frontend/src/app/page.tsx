'use client'

import { useAccount } from 'wagmi'
import { Dashboard } from '@/components/chantier/Dashboard'
import NotConnected from '@/components/shared/NotConnected'

export default function Home() {
  const { isConnected } = useAccount()

  return isConnected ? (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <Dashboard />
    </div>
  ) : (
    <NotConnected />
  )
}
