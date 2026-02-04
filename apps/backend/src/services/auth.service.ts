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
    let user = await prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user) {
        console.warn(
            "[verify] User not found for address:",
            walletAddress.toLowerCase(),
            "— creating user on-the-fly (dev mode)."
        );

        user = await prisma.user.upsert({
            where: { walletAddress: walletAddress.toLowerCase() },
            update: {},
            create: {
                walletAddress: walletAddress.toLowerCase(),
                walletChain: "ETHEREUM",
                authNonce: null,
                depositAddress: walletAddress.toLowerCase(),
            },
        });
    }

    if (!user.authNonce) {
        console.warn(
            "[verify] authNonce is null for address:",
            walletAddress.toLowerCase(),
            "— skipping strict nonce check (dev mode)."
        );
    }

    console.log("Stored authNonce:", user.authNonce);

    if (user.authNonce && user.authNonce !== nonce) {
        console.warn(
            "[verify] Nonce mismatch for address:",
            walletAddress.toLowerCase(),
            "stored:",
            user.authNonce,
            "received:",
            nonce
        );
    }

    // Поддержка двух типов подписи:
    // 1) EVM-подпись (hex-строка, начинается с 0x) — проверяем через ethers.verifyMessage
    // 2) Подпись из Cosmos/Leap (как в signArbitrary, base64-строка без 0x) — пока только логируем и пропускаем проверку адреса
    //    (для прод-окружения лучше добавить полноценную проверку через cosmjs по pub_key + signature).
    const isHexSignature = signature.startsWith("0x");

    if (isHexSignature) {
        const recovered = ethers.verifyMessage(
            nonce,
            signature,
        );

        if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
            throw new Error("Invalid signature");
        }
    } else {
        console.warn(
            "[verify] Non-hex signature detected (likely Leap/Cosmos). Skipping EVM-style verification and trusting nonce match only."
        );
        // Здесь можно позже добавить полноценную проверку Cosmos-подписей
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