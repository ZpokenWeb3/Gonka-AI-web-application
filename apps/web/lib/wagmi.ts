import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
} from "wagmi/chains";

import { createConfig, http } from "wagmi";

import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";

function getConfig() {
  return createConfig({
    chains: [mainnet, polygon, optimism, arbitrum, sepolia],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [sepolia.id]: http(),
    },
    connectors: connectorsForWallets(
      [
        {
          groupName: "Wallets",
          wallets: [
            metaMaskWallet,
            walletConnectWallet,
            coinbaseWallet,
          ],
        },
      ],
      {
        appName: "My RainbowKit App",
        projectId: "f0248126e0f85f7e80132287496a8c89",
      }
    ),
    ssr: false,
  });
}

export const config = getConfig();