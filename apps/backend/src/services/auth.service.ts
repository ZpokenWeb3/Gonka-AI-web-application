import { ethers } from "ethers";
import crypto from "crypto";
import { prisma } from "../config/database";
import { signToken } from "../utils/jwt";

export const generateNonce = async (walletAddress: string) => {
    const nonce = `Sign this message to login: ${crypto.randomUUID()}`;

    await prisma.user.upsert({
        where: { walletAddress: walletAddress.toLowerCase() },
        update: { authNonce: nonce },
        create: {
            walletAddress: walletAddress.toLowerCase(),
            walletChain: "ETHEREUM",
            authNonce: nonce,
            depositAddress: walletAddress.toLowerCase(),
        }
    });

    return nonce;
}

export const verify = async (walletAddress: string, signature: string) => {
    const user = await prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user?.authNonce) {
        throw new Error("Invalid auth");
    }

    const recovered = ethers.verifyMessage(
        user.authNonce,
        signature,
    );

    if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error("Invalid signature");
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            authNonce: null,
            lastSeenAt: new Date()
        }
    });

    return signToken({
        userId: user.id,
        walletAddress: user.walletAddress,
    });
}