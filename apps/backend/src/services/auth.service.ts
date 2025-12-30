import { ethers } from "ethers";
import crypto from "crypto";
import { prisma } from "../config/database";
import { signToken } from "../utils/jwt";

export const generateNonce = async (walletAddress: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (existingUser?.authNonce) {
        return existingUser.authNonce;
    }

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

export const verify = async (walletAddress: string, signature: string, nonce: string) => {
    console.log("=== VERIFY DEBUG ===");
    console.log("Input walletAddress:", walletAddress);
    console.log("Input nonce:", nonce);
    console.log("Input signature:", signature);
    
    const user = await prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user?.authNonce) {
        console.log("ERROR: No user or authNonce found");
        throw new Error("Invalid auth");
    }

    console.log("Stored authNonce:", user.authNonce);

    if (user.authNonce !== nonce) {
        console.log("ERROR: Nonce mismatch");
        console.log("Expected:", user.authNonce);
        console.log("Received:", nonce);
        throw new Error("Invalid nonce");
    }

    const recovered = ethers.verifyMessage(
        nonce,
        signature,
    );

    console.log("Recovered address:", recovered);
    console.log("Expected address:", walletAddress);

    if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
        console.log("ERROR: Address mismatch");
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