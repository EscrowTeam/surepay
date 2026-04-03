import { createPublicClient, http } from 'viem'
import { hardhat, arbitrumSepolia } from 'viem/chains'

// Réseau actif selon la variable d'environnement (défaut : hardhat local)
const isTestnet = process.env.NEXT_PUBLIC_NETWORK === 'arbitrumSepolia'

export const publicClient = createPublicClient({
  chain: isTestnet ? arbitrumSepolia : hardhat,
  transport: http(
    isTestnet
      ? (process.env.NEXT_PUBLIC_RPC_URL ?? 'https://sepolia-rollup.arbitrum.io/rpc')
      : 'http://127.0.0.1:8545/'
  ),
})
