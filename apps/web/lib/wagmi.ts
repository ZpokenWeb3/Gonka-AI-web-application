import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
} from "wagmi/chains";
import {getDefaultConfig} from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "f0248126e0f85f7e80132287496a8c89",
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
    ssr: false,
});
