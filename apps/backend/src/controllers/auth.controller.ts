import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const getNonce = async (req: Request, res: Response) => {
  try {
    const { address } = req.body;

    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "address is required" });
    }

    const nonce = await AuthService.generateNonce(address);

    return res.json({ nonce });
    
  } catch (err) {
    console.error("Failed to generate nonce", err);
    return res.status(500).json({ error: "Failed to generate nonce" });
  }
};

export const verifySignature = async (req: Request, res: Response) => {
  try {
    const { address, signature, nonce } = req.body;

    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "address is required" });
    }

    if (!signature || typeof signature !== "string") {
      return res.status(400).json({ error: "signature is required" });
    }

    if (!nonce || typeof nonce !== "string") {
      return res.status(400).json({ error: "nonce is required" });
    }

    const token = await AuthService.verify(address, signature, nonce);
    return res.json({ token });
  } catch (err) {
    console.error("Failed to verify wallet signature", err);
    return res.status(400).json({ error: "Invalid signature" });
  }
}