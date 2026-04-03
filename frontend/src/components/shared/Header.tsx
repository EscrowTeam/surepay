'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import ConnectButton from './ConnectButton'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center size-8 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
            </button>
          )}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.82_0.15_175)] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-black" />
            </div>
            <span className="font-bold text-lg tracking-tight">Trust BTP</span>
          </button>
        </div>
        <ConnectButton />
      </div>
    </header>
  )
}
