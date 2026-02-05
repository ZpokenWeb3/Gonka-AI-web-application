import { ApiKey, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createApiKey = async(userId: string, name: string, keyPrefix: string, keyHash: string): Promise<ApiKey> => {
    const apiKey = await prisma.apiKey.create({
        data: {
            userId,
            name,
            keyPrefix,
            keyHash
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