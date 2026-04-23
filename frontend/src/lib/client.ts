import { createPublicClient, http } from 'viem'
import { hardhat, arbitrumSepolia } from 'viem/chains'

// Réseau actif selon la variable d'environnement (défaut : hardhat local)
export const isTestnet = process.env.NEXT_PUBLIC_NETWORK === 'arbitrumSepolia'

export const publicClient = createPublicClient({
  chain: isTestnet ? arbitrumSepolia : hardhat,
  transport: http(
    isTestnet
      ? (process.env.NEXT_PUBLIC_RPC_URL ?? 'https://sepolia-rollup.arbitrum.io/rpc')
      : 'http://127.0.0.1:8545/',
    { timeout: 30_000 }
  ),
})

// Bloc de départ pour les getLogs — évite de scanner depuis le bloc 0.
// En local (hardhat), on part toujours du bloc 0 car la chaîne est éphémère.
// Sur testnet, mettre à jour dans .env.local après chaque déploiement :
//   NEXT_PUBLIC_DEPLOY_BLOCK=<numéro du bloc du premier déploiement>
export const DEPLOY_FROM_BLOCK = isTestnet
  ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK ?? '1')
  : 0n
