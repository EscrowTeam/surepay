# Trust BTP — CLAUDE.md

Protocole de séquestre décentralisé pour chantiers BTP entre artisans et particuliers.
Paiements par jalons, yield DeFi optionnel (Aave V3), réputation on-chain, NFT soulbound.
Réseau cible : **Arbitrum Sepolia** (testnet) / Hardhat (local).

---

## Structure du monorepo

```
/
├── backend/       Smart contracts Solidity + tests Hardhat
├── frontend/      Interface Next.js (App Router)
└── doc/           Documentation de référence
```

---

## Stack technique

**Backend**
- Solidity 0.8.28, Hardhat v3, OpenZeppelin v5.6.1
- Réseau : Arbitrum Sepolia / Hardhat local
- Déploiement : Hardhat Ignition

**Frontend**
- Next.js 16 App Router, TypeScript, Tailwind CSS v4
- wagmi v3 + viem v2 + Reown AppKit (connexion wallet)
- TanStack React Query v5, shadcn/ui, lucide-react

---

## Documents de référence

| Fichier | Rôle |
|---|---|
| `doc/business-rules.md` | Règles métier complètes : rôles, statuts, flux, finances, jalons, litige, NFT, Trust Score |
| `doc/architecture.md` | Architecture globale : contrats, frontend, interactions frontend ↔ backend |
| `doc/contract-abi.md` | Référence exhaustive de toutes les fonctions publiques des contrats |
| `backend/README.md` | Guide backend : commandes, constantes, flux principal |

---

## Conventions de code

**Nommage**
- Solidity : `camelCase` pour les variables/fonctions, `PascalCase` pour les contrats/structs/enums
- TypeScript : `camelCase` pour les variables/fonctions, `PascalCase` pour les composants/types
- Hooks React : préfixe `use` (ex: `useChantier`, `useSubmitDevis`)
- Fichiers composants : `PascalCase.tsx` — fichiers utilitaires : `camelCase.ts`

**Règle d'or** : toute logique d'interaction blockchain doit passer par les hooks dans `frontend/src/hooks/`. Jamais d'appel direct à wagmi/viem depuis un composant ou une page.

---

## Commandes utiles

```bash
# Backend
cd backend
npm install
npx hardhat compile
npx hardhat test test/EscrowVault.ts
npx hardhat ignition deploy ignition/modules/TrustBTP.ts          # local
npx hardhat ignition deploy ignition/modules/TrustBTP.ts \
  --network arbitrumSepolia --parameters ignition/parameters.json  # testnet

# Frontend
cd frontend
npm install
npm run dev          # dev avec hot reload
npm run dev:poll     # dev dans WSL/Docker (polling)
npm run build
npm run lint
```
