"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getMe = exports.verifySignature = exports.getNonce = void 0;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const getNonce = async (req, res) => {
    try {
        const { address } = req.body;
        if (!address || typeof address !== "string") {
            return res.status(400).json({ error: "address is required" });
        }
        const nonce = await (0, auth_service_1.generateNonce)(address);
        return res.json({ nonce });
    }
    catch (err) {
        console.error("Failed to generate nonce", err);
        return res.status(500).json({ error: "Failed to generate nonce" });
    }
};
exports.getNonce = getNonce;
const verifySignature = async (req, res) => {
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
        const token = await (0, auth_service_1.verify)(address, signature, nonce);
        return res.json({ token });
    }
    catch (err) {
        console.error("Failed to verify wallet signature", err);
        return res.status(400).json({ error: "Invalid signature" });
    }
};
exports.verifySignature = verifySignature;
const getMe = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await (0, user_service_1.getCurrentUser)(userId);
        return res.json({
            success: true,
            data: user,
        });
    }
    catch (err) {
        console.error("Failed to get current user", err);
        if (err instanceof Error && err.message === "User not found") {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(500).json({ error: "Failed to get user information" });
    }
};
exports.getMe = getMe;
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { displayName, avatarUrl, lowBalanceAlert, depositNotifications, defaultModel } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await (0, user_service_1.updateUserProfile)(userId, {
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
    }
    catch (err) {
        console.error("Failed to update profile", err);
        return res.status(500).json({ error: "Failed to update profile" });
    }
};
exports.updateProfile = updateProfile;
