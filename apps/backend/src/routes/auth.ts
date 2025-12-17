import { Router } from "express";
import { z } from "zod";
import { randomUUID } from "crypto";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { WalletChain } from "@prisma/client";

const router = Router();

const nonces = new Map<string, string>();

const nonceRequestSchema = z.object({
  address: z
    .string()
    .min(1)
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
});

const verifyRequestSchema = z.object({
  address: z
    .string()
    .min(1)
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
  nonce: z.string().min(1),
  signature: z.string().min(1),
});

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret-change-me";

router.post("/auth/nonce", (req, res) => {
  const parseResult = nonceRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: parseResult.error.flatten(),
    });
  }

  const address = parseResult.data.address.toLowerCase();
  const nonce = randomUUID();

  nonces.set(address, nonce);

  return res.json({ nonce });
});

router.post("/auth/verify", async (req, res) => {
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
    const recoveredAddress = ethers.verifyMessage(nonce, signature).toLowerCase();

    if (recoveredAddress !== normalizedAddress) {
      return res.status(401).json({ error: "Signature does not match address" });
    }

    // Нонc одноразовый — сразу удаляем
    nonces.delete(normalizedAddress);

    // Найти или создать пользователя в БД по адресу кошелька
    const user = await prisma.user.upsert({
      where: { walletAddress: normalizedAddress },
      update: { lastSeenAt: new Date() },
      create: {
        walletAddress: normalizedAddress,
        walletChain: WalletChain.ETHEREUM,
        // временный технический адрес депозита, пока не подключён реальный депозитный механизм
        depositAddress: normalizedAddress,
        isActive: true,
        lastSeenAt: new Date(),
      },
    });

    const token = jwt.sign(
      {
        sub: user.id,
        userId: user.id,
        walletAddress: normalizedAddress,
      },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.json({ token });
  } catch (err) {
    console.error("Failed to verify wallet signature", err);
    return res.status(400).json({ error: "Invalid signature" });
  }
});

export default router;

