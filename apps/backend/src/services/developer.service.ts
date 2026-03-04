import { ApiKey, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateApiKeyData {
    name?: string;
    rateLimitPerMinute?: number;
    rateLimitPerDay?: number;
    monthlySpendLimit?: number;
    isActive?: boolean;
}

export const createApiKey = async(userId: string, name: string, keyPrefix: string, keyHash: string, rateLimitPerMinute: number, rateLimitPerDay: number, monthlySpendLimit: number): Promise<ApiKey> => {
    const apiKey = await prisma.apiKey.create({
        data: {
            userId,
            name,
            keyPrefix,
            keyHash,
            rateLimitPerMinute,
            rateLimitPerDay,
            monthlySpendLimit
        }
    })

    return apiKey;
}

export const getUserApiKeys = async(userId: string): Promise<ApiKey[]> => {
    return prisma.apiKey.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
}

export const deleteApiKey = async(userId: string, keyId: string): Promise<boolean> => {
    const deletedKey = await prisma.apiKey.deleteMany({
        where: { 
            id: keyId,
            userId: userId 
        }
    });
    
    return deletedKey.count > 0;
}

export const updateApiKey = async(userId: string, keyId: string, data: UpdateApiKeyData): Promise<ApiKey | null> => {
    const existingKey = await prisma.apiKey.findFirst({
        where: {
            id: keyId,
            userId: userId
        }
    });

    if (!existingKey) {
        return null;
    }

    const updatedKey = await prisma.apiKey.update({
        where: { id: keyId },
        data
    });

    return updatedKey;
}