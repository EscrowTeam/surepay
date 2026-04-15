'use client'

import { ShieldCheck, Layers, Zap, Scale } from 'lucide-react'
import { AppKitButton } from '@reown/appkit/react'

const STEPS = [
  { num: '01', title: 'Créer le chantier', desc: "L'artisan définit les jalons, montants et conditions de validation." },
  { num: '02', title: 'Déposer les fonds', desc: 'Le client dépose 110% du devis dans le smart contract d\'escrow.' },
  { num: '03', title: 'Valider les jalons', desc: 'À chaque étape, le client valide — les fonds sont libérés à l\'artisan.' },
  { num: '04', title: 'Clôturer', desc: 'Le chantier est terminé, les fonds sont intégralement distribués.' },
]

export default function NotConnected() {
  return (
    <div className="grid-bg min-h-[calc(100vh-65px)]">
      {/* Hero */}
      <section className="relative py-24 px-4 text-center">
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full bg-[oklch(0.82_0.15_175)]/10 blur-3xl" />
        </div>
        <div className="relative container max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.82_0.15_175)]/30 bg-[oklch(0.82_0.15_175)]/10 px-4 py-1.5 text-sm text-[oklch(0.82_0.15_175)]">
            <ShieldCheck className="size-4" /> Paiements sécurisés par smart contract
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Sécurisez vos chantiers<br />
            avec l&apos;<span className="text-teal">escrow</span>{' '}
            <span className="text-[oklch(0.82_0.15_175)]">décentralisé</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Dépôt, jalons, validation, libération — chaque étape est automatisée,
            traçable et transparente.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <AppKitButton />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            {[
              [ShieldCheck, 'Aucun intermédiaire'],
              [Layers, 'Fonds bloqués en escrow'],
              [Zap, 'Libération par jalons'],
              [Scale, 'Arbitrage intégré'],
            ].map(([Icon, label]: any) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="size-4 text-[oklch(0.82_0.15_175)]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça <span className="text-[oklch(0.82_0.15_175)]">marche</span>
          </h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {STEPS.map(({ num, title, desc }, i) => (
              <div key={num} className="relative text-center space-y-3">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-1/2 w-full h-px bg-gradient-to-r from-[oklch(0.82_0.15_175)]/40 to-transparent" />
                )}
                <div className="text-5xl font-black text-[oklch(0.82_0.15_175)]/20 leading-none">{num}</div>
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deux publics */}
      <section className="py-16 px-4 pb-24">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Conçu pour <span className="text-[oklch(0.82_0.15_175)]">deux mondes</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Particuliers */}
            <div className="rounded-2xl border border-[oklch(0.82_0.15_175)]/20 bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.82_0.15_175)]/10">
                  <ShieldCheck className="size-5 text-[oklch(0.82_0.15_175)]" />
                </div>
                <h3 className="text-lg font-bold">Particuliers</h3>
              </div>
              <p className="text-sm text-muted-foreground">Vous faites des travaux ? Ne payez plus dans le flou.</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Vos fonds sont bloqués, pas perdus — visibilité totale',
                  'Libération uniquement quand le jalon est validé',
                  'Mécanisme de contestation intégré si désaccord',
                  'Plus besoin d\'attendre 6–24 mois devant un tribunal',
                  'Adapté aux chantiers < 15 000 €',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[oklch(0.82_0.15_175)] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Artisans */}
            <div className="rounded-2xl border border-purple-500/20 bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                  <Zap className="size-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold">Artisans</h3>
              </div>
              <p className="text-sm text-muted-foreground">Vous êtes artisan ? Sécurisez votre trésorerie.</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Le paiement est préparé et verrouillé avant le démarrage',
                  'Libération automatique à chaque jalon validé',
                  'Plus de retards de paiement ou de clients fantômes',
                  'Confiance renforcée avec vos clients',
                  'Concentrez-vous sur le chantier, pas sur le recouvrement',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
