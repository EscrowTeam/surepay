# Surepay Construction

![CI](https://github.com/EscrowTeam/surepay/actions/workflows/contracts.yml/badge.svg?branch=main)
![Build](https://github.com/EscrowTeam/surepay/actions/workflows/frontend.yml/badge.svg?branch=main)
![Tests](https://github.com/EscrowTeam/surepay/actions/workflows/contracts.yml/badge.svg?branch=main&label=tests)
[![Vercel](https://img.shields.io/github/deployments/EscrowTeam/surepay/Production?label=vercel&logo=vercel&logoColor=white)](https://github.com/EscrowTeam/surepay/deployments)

Plateforme Web3 de sécurisation et d'orchestration des paiements de travaux.

## Vue d'ensemble

Surepay combine trois mécanismes :

1. **Escrow à jalons** — les fonds du client sont bloqués et libérés progressivement à chaque étape validée du chantier.
2. **Yield opt-in (Morpho)** — si le client l'accepte, les fonds idle sont déployés sur Morpho (ERC-4626) en USDC. Le vault reçoit des shares Morpho ; le client accumule des crédits travaux en échange.
3. **Lending artisan (CDP)** — les fonds en escrow servent de collatéral. L'artisan peut emprunter des USDC pour financer ses achats de matériaux avant le déblocage du premier jalon.

**Stablecoin unique : USDC (Circle)**

---

## Structure du repo

```
surepay/
├── .devcontainer/          # Config environnement de développement
├── backend/                # Smart contracts + tests (Hardhat TypeScript)
│   ├── contracts/
│   │   ├── core/           # EscrowVault, AccessControl
│   │   ├── nft/            # ChantierNFT (ERC-5192 soulbound)
│   │   ├── defi/           # YieldVault, LendingManager + interfaces
│   │   ├── dispute/        # DisputeResolver (3 niveaux)
│   │   └── mocks/          # MockUSDC, MockMorpho pour les tests
│   ├── test/
│   │   ├── unit/           # Tests unitaires par contrat
│   │   └── integration/    # Tests fork Arbitrum mainnet
│   ├── ignition/modules/   # Scripts de déploiement Hardhat Ignition
│   ├── scripts/            # Tâches utilitaires
│   └── docs/               # Notes d'architecture, audit checklist
└── frontend/               # App Next.js (à venir)
```

---

## Smart contracts

| Contrat | Rôle | Phase |
|---|---|---|
| `SurepayAccessControl` | KYC whitelist + rôles (CLIENT, ARTISAN, MEDIATOR, ARBITRATOR, BACKEND, ADMIN) | 1 |
| `EscrowVault` | Dépôt USDC, jalons, validation, libération, protocol fee 2% | 1 |
| `ChantierNFT` | ERC-5192 soulbound — dossier probatoire du chantier | 1 |
| `DisputeResolver` | Litiges 3 niveaux : amiable (15j) → médiation (30j) → arbitrage (21j) | 1 |
| `YieldVault` | Opt-in client — déploiement USDC sur Morpho ERC-4626, crédits travaux | 2 |
| `LendingManager` | CDP artisan — collatéral escrow → emprunt USDC matériaux via Morpho | 2 |

---

## Architecture des flux (cas nominal)

```
Client (USDC)                                    Artisan
     │                                               │
     │ depositFunds(chantierId)                       │ depositCaution(chantierId)
     ▼                                               ▼
┌─────────────────── EscrowVault ──────────────────────┐
│  Fonds ségrégués par chantier (USDC)                 │
│  Jalons : EN_ATTENTE → PREUVE_SOUMISE → PAYE         │
│       ↓ opt-in client                                │
│  YieldVault → Morpho (shares ERC-4626)               │
│       ↓ collatéral artisan                           │
│  LendingManager → emprunt USDC → fournisseurs        │
└──────────────────────────────────────────────────────┘
     │ validateMilestone()                             │
     ▼                                               ▼
  release USDC artisan (- 2% fee)            remboursement emprunt auto
     │
  ChantierNFT mis à jour (soulbound)
```

---

## Démarrage rapide

```bash
cd backend
npm install
cp .env.example .env   # renseigner les clés
npx hardhat compile
npx hardhat test
```

---

## Prérequis réglementaires (avant mainnet)

- Partenaire PSP / EP agréé ACPR contractualisé
- Prestataire KYC / AML certifié
- Mémo juridique PSFP + MiCA + LCB-FT signé
- Partenaire CASP agréé MiCA (deadline AMF : 1er juillet 2026)
- Audit smart contracts externe (Certora / Consensys Diligence)

---

## Stack technique

- Solidity `^0.8.24`
- Hardhat + TypeScript
- OpenZeppelin Contracts v5
- Morpho Protocol (ERC-4626 vaults)
- Arbitrum One (L2 EVM cible)
- Gnosis Safe multisig 3/5 (admin / kill-switch)
- Pinata (IPFS — preuves chantier + métadonnées NFT)

---

*Document de travail confidentiel — ne pas diffuser sans autorisation.*
