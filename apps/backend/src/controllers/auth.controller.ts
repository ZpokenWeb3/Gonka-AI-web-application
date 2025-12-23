import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const getNonce = async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress || typeof walletAddress !== "string") {
      return res.status(400).json({ error: "walletAddress is required" });
    }

    const nonce = await AuthService.generateNonce(walletAddress);

    return res.json({ nonce });
    
  } catch (err) {
    console.error("Failed to generate nonce", err);
    return res.status(500).json({ error: "Failed to generate nonce" });
  }
};

export const verifySignature = async (req: Request, res: Response) => {
  try {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || typeof walletAddress !== "string") {
      return res.status(400).json({ error: "walletAddress is required" });
    }

    if (!signature || typeof signature !== "string") {
      return res.status(400).json({ error: "signature is required" });
    }

    const token = await AuthService.verify(walletAddress, signature);
    return res.json({ token });
  } catch (err) {
    console.error("Failed to verify wallet signature", err);
    return res.status(400).json({ error: "Invalid signature" });
  }
}