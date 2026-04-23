import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * Module de déploiement local (Hardhat localhost / hardhat network).
 *
 * Utilise MockYieldProvider à la place d'AaveV3YieldProvider :
 * Aave V3 n'est pas nécessaire en local — le mock suffit pour tester
 * l'intégralité du flux yield (deposit, pendingYield, collecterYield, withdraw).
 *
 * Pour simuler l'accrual de yield dans les tests/scripts :
 *   await mockUSDC.mint(mockYieldProvider.address, yieldAmount)
 *   // pendingYield() retourne automatiquement le surplus via balanceOf()
 *
 * Comptes Hardhat utilisés :
 *   [0] deployer    — owner, treasury, arbiter
 *   [1] artisan     — approvisionné avec 100 000 MockUSDC
 *   [2] particulier — approvisionné avec 100 000 MockUSDC
 *
 * Usage :
 *   npx hardhat ignition deploy ignition/modules/LocalTrustBTP.ts --network localhost
 */

// 100 000 USDC (6 décimales)
const MINT_AMOUNT = 100_000_000_000n;

// DEMO ONLY — adresse EOA qui recevra les NFT soulbound (visible dans le wallet).
// Remplacer par votre adresse MetaMask avant la soutenance.
// Mettre à "" pour désactiver (NFT minté vers le vault comme en production).
const DEMO_NFT_RECIPIENT = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

const LocalTrustBTPModule = buildModule("LocalTrustBTP", (m) => {
  const deployer    = m.getAccount(0);
  const artisan     = m.getAccount(1);
  const particulier = m.getAccount(2);

  // ── 1. Mock USDC ──────────────────────────────────────────────────────────

  const mockUSDC = m.contract("ERC20Mock", ["USDC (Mock)", "USDC", 6], {
    id: "MockUSDC",
  });

  // ── 2. Contrats principaux ─────────────────────────────────────────────────

  const trustScoreRegistry = m.contract("TrustScoreRegistry", [deployer]);

  const chantierNFT = m.contract("ChantierNFT", [deployer]);

  const escrowVault = m.contract("EscrowVault", [
    deployer,   // owner
    deployer,   // treasury
    deployer,   // arbiter
    trustScoreRegistry,
    chantierNFT,
  ]);

  // ── 3. Câblage post-déploiement ───────────────────────────────────────────

  m.call(trustScoreRegistry, "setEscrowVault", [escrowVault], {
    id: "wireRegistry",
  });

  // DEMO ONLY — doit être appelé avant transferOwnership (deployer est encore owner).
  // address(0) = comportement normal (vault). Mettre votre EOA dans DEMO_NFT_RECIPIENT.
  m.call(chantierNFT, "setDemoMintRecipient", [DEMO_NFT_RECIPIENT], {
    id: "setDemoNFTRecipient",
  });

  m.call(chantierNFT, "transferOwnership", [escrowVault], {
    id: "transferNFTOwnership",
  });

  // ── 4. MockYieldProvider ──────────────────────────────────────────────────
  //
  // Le vault est owner du provider (seul lui peut appeler deposit/withdraw).
  // Pas de registerToken nécessaire : le mock lit balanceOf() directement.

  const mockYieldProvider = m.contract("MockYieldProvider", [escrowVault]);

  m.call(escrowVault, "setYieldProvider", [mockYieldProvider], {
    id: "wireYieldProvider",
  });

  // ── 5. Autorisation du token ──────────────────────────────────────────────

  m.call(escrowVault, "setAllowedToken", [mockUSDC, true], {
    id: "allowUSDC",
  });

  // ── 6. Approvisionnement des comptes de test ──────────────────────────────

  m.call(mockUSDC, "mint", [artisan, MINT_AMOUNT], {
    id: "mintArtisan",
  });

  m.call(mockUSDC, "mint", [particulier, MINT_AMOUNT], {
    id: "mintParticulier",
  });

  return {
    mockUSDC,
    trustScoreRegistry,
    chantierNFT,
    escrowVault,
    mockYieldProvider,
  };
});

export default LocalTrustBTPModule;