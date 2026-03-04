import crypto, { hash } from "crypto";
import { Request, Response } from "express";
import { createApiKey, getUserApiKeys, deleteApiKey, updateApiKey } from "../services/developer.service";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

function generateApiKey(): string {
    const prefix = "gnk_";
    const randomPart = crypto.randomBytes(9).toString("base64url");
    return prefix + randomPart;
}

export const createKey = async(req: Request, res: Response) => {
    try{
        const userId = req.userId!;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { name, rateLimitPerMinute, rateLimitPerDay, monthlySpendLimit } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: "Name is required and must be a string" });
        }

        const trimmedName = name.trim();

        if (!trimmedName) {
            return res.status(400).json({ error: "Name must not be empty" });
        }

        if (trimmedName.length > 20) {
            return res.status(400).json({ error: "Name must be at most 20 characters" });
        }

        const fullKey = generateApiKey();
        const keyPrefix = fullKey.slice(0, 6);
        const keyHash = crypto.createHash('sha256').update(fullKey).digest('hex');

        const apiKey = await createApiKey(userId, trimmedName, keyPrefix, keyHash, rateLimitPerMinute, rateLimitPerDay, monthlySpendLimit);

        return res.status(201).json({
            success: true,
            data: {
                id: apiKey.id,
                name: apiKey.name,
                keyPrefix: apiKey.keyPrefix,
                fullKey: fullKey,
                rateLimitPerMinute: apiKey.rateLimitPerMinute,
                rateLimitPerDay: apiKey.rateLimitPerDay,
                monthlySpendLimit: apiKey.monthlySpendLimit,
                createdAt: apiKey.createdAt,
                isActive: apiKey.isActive
            }
        });

    } catch(err){
        console.error("Failed to create API key:", err);
        return res.status(500).json({ 
            success: false,
            error: "Failed to create API key" 
        });
    }
}

export const getKeys = async(req: Request, res: Response) => {
    try{
        const userId = req.userId!;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const apiKeys = await getUserApiKeys(userId);

        return res.json({
            success: true,
            data: apiKeys.map(key => ({
                id: key.id,
                name: key.name,
                keyPrefix: key.keyPrefix,
                createdAt: key.createdAt,
                lastUsedAt: key.lastUsedAt,
                isActive: key.isActive,
                rateLimitPerMinute: key.rateLimitPerMinute,
                rateLimitPerDay: key.rateLimitPerDay,
                monthlySpendLimit: key.monthlySpendLimit,
            }))
        });

    } catch(err){
        console.error("Failed to get API keys:", err);
        return res.status(500).json({ 
            success: false,
            error: "Failed to get API keys" 
        });
    }
}

export const deleteKey = async(req: Request, res: Response) => {
    try{
        const userId = req.userId!;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!id) {
            return res.status(400).json({ error: "Key ID is required" });
        }

        const deleted = await deleteApiKey(userId, id);

        if (!deleted) {
            return res.status(404).json({ 
                success: false,
                error: "API key not found or access denied" 
            });
        }

        return res.json({
            success: true,
            message: "API key deleted successfully"
        });

    } catch(err){
        console.error("Failed to delete API key:", err);
        return res.status(500).json({ 
            success: false,
            error: "Failed to delete API key" 
        });
    }
}

export const updateKey = async(req: Request, res: Response) => {
    try{
        const userId = req.userId!;
        const { id } = req.params;
        const { name, rateLimitPerMinute, rateLimitPerDay, monthlySpendLimit, isActive } = req.body;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!id) {
            return res.status(400).json({ error: "Key ID is required" });
        }

        const hasUpdatableField = 
            typeof name !== "undefined" ||
            typeof rateLimitPerMinute !== "undefined" ||
            typeof rateLimitPerDay !== "undefined" ||
            typeof monthlySpendLimit !== "undefined" ||
            typeof isActive !== "undefined";

        if (!hasUpdatableField) {
            return res.status(400).json({ error: "No fields provided to update" });
        }

        if (typeof name !== "undefined") {
            if (typeof name !== "string") {
                return res.status(400).json({ error: "Name must be a string" });
            }

            const trimmedName = name.trim();

            if (!trimmedName) {
                return res.status(400).json({ error: "Name must not be empty" });
            }

            if (trimmedName.length > 20) {
                return res.status(400).json({ error: "Name must be at most 20 characters" });
            }
        }

        const updateData: {
            name?: string;
            rateLimitPerMinute?: number;
            rateLimitPerDay?: number;
            monthlySpendLimit?: number;
            isActive?: boolean;
        } = {};

        if (typeof name !== "undefined") {
            updateData.name = name.trim();
        }

        if (typeof rateLimitPerMinute !== "undefined") {
            updateData.rateLimitPerMinute = rateLimitPerMinute;
        }

        if (typeof rateLimitPerDay !== "undefined") {
            updateData.rateLimitPerDay = rateLimitPerDay;
        }

        if (typeof monthlySpendLimit !== "undefined") {
            updateData.monthlySpendLimit = monthlySpendLimit;
        }

        if (typeof isActive !== "undefined") {
            updateData.isActive = isActive;
        }

        const apiKey = await updateApiKey(userId, id, updateData);

        if (!apiKey) {
            return res.status(404).json({
                success: false,
                error: "API key not found or access denied"
            });
        }

        return res.json({
            success: true,
            data: {
                id: apiKey.id,
                name: apiKey.name,
                keyPrefix: apiKey.keyPrefix,
                createdAt: apiKey.createdAt,
                lastUsedAt: apiKey.lastUsedAt,
                isActive: apiKey.isActive,
            }
        });

    } catch(err){
        console.error("Failed to update API key:", err);
        return res.status(500).json({ 
            success: false,
            error: "Failed to update API key" 
        });
    }
}