import { Request, Response } from "express";
import { generateNonce, verify } from "../services/auth.service";
import { getCurrentUser, updateUserProfile } from "../services/user.service";


declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const getNonce = async (req: Request, res: Response) => {
  try {
    const { address } = req.body;

    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "address is required" });
    }

    const nonce = await generateNonce(address);

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

    const token = await verify(address, signature, nonce);
    return res.json({ token });
  } catch (err) {
    console.error("Failed to verify wallet signature", err);
    return res.status(400).json({ error: "Invalid signature" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await getCurrentUser(userId);

    return res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Failed to get current user", err);
    
    if (err instanceof Error && err.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.status(500).json({ error: "Failed to get user information" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { displayName, avatarUrl, lowBalanceAlert, depositNotifications, defaultModel } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await updateUserProfile(userId, {
      displayName,
      avatarUrl,
      lowBalanceAlert,
      depositNotifications,
      defaultModel
    });

    return res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Failed to update profile", err);
    return res.status(500).json({ error: "Failed to update profile" });
  }
};