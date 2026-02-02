import { ethers } from "ethers";
import crypto from "crypto";
import { prisma } from "../config/database";
import { signToken } from "../utils/jwt";

export const generateNonce = async (walletAddress: string) => {
    const startTime = Date.now();
    try {
        console.log(`[generateNonce] Starting for address: ${walletAddress.toLowerCase()}`);
        
        const existingUser = await prisma.user.findUnique({
            where: { walletAddress: walletAddress.toLowerCase() },
        });

        const findTime = Date.now() - startTime;
        console.log(`[generateNonce] Find user took: ${findTime}ms`);

        if (existingUser?.authNonce) {
            console.log(`[generateNonce] Returning existing nonce`);
            return existingUser.authNonce;
        }

        const nonce = `Sign this message to login: ${crypto.randomUUID()}`;
        const upsertStartTime = Date.now();

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

        const upsertTime = Date.now() - upsertStartTime;
        const totalTime = Date.now() - startTime;
        console.log(`[generateNonce] Upsert took: ${upsertTime}ms, Total: ${totalTime}ms`);

        return nonce;
    } catch (error) {
        const totalTime = Date.now() - startTime;
        console.error(`[generateNonce] Error after ${totalTime}ms:`, error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        throw error;
    }
}

export const verify = async (walletAddress: string, signature: string, nonce: string) => {    
    const user = await prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user?.authNonce) {
        throw new Error("Invalid auth");
    }

    console.log("Stored authNonce:", user.authNonce);

    if (user.authNonce !== nonce) {
        throw new Error("Invalid nonce");
    }

    const recovered = ethers.verifyMessage(
        nonce,
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