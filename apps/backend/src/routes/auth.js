"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const crypto_1 = require("crypto");
const ethers_1 = require("ethers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const nonces = new Map();
const nonceRequestSchema = zod_1.z.object({
    address: zod_1.z
        .string()
        .min(1)
        .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
});
const verifyRequestSchema = zod_1.z.object({
    address: zod_1.z
        .string()
        .min(1)
        .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
    nonce: zod_1.z.string().min(1),
    signature: zod_1.z.string().min(1),
});
const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret-change-me";
router.post("/nonce", (req, res) => {
    const parseResult = nonceRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            error: "Invalid request body",
            details: parseResult.error.flatten(),
        });
    }
    const address = parseResult.data.address.toLowerCase();
    const nonce = (0, crypto_1.randomUUID)();
    nonces.set(address, nonce);
    return res.json({ nonce });
});
router.post("/verify", async (req, res) => {
    const parseResult = verifyRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            error: "Invalid request body",
            details: parseResult.error.flatten(),
        });
    }
    const { address, nonce, signature } = parseResult.data;
    const normalizedAddress = address.toLowerCase();
    const expectedNonce = nonces.get(normalizedAddress);
    if (!expectedNonce || expectedNonce !== nonce) {
        return res.status(400).json({ error: "Invalid or expired nonce" });
    }
    try {
        const recoveredAddress = ethers_1.ethers.verifyMessage(nonce, signature).toLowerCase();
        if (recoveredAddress !== normalizedAddress) {
            return res.status(401).json({ error: "Signature does not match address" });
        }
        nonces.delete(normalizedAddress);
        const user = await database_1.prisma.user.upsert({
            where: { walletAddress: normalizedAddress },
            update: { lastSeenAt: new Date() },
            create: {
                walletAddress: normalizedAddress,
                walletChain: client_1.WalletChain.ETHEREUM,
                depositAddress: normalizedAddress,
                isActive: true,
                lastSeenAt: new Date(),
            },
        });
        const token = jsonwebtoken_1.default.sign({
            sub: user.id,
            userId: user.id,
            walletAddress: normalizedAddress,
        }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }
    catch (err) {
        console.error("Failed to verify wallet signature", err);
        return res.status(400).json({ error: "Invalid signature" });
    }
});
exports.default = router;
