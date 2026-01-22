"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApiKey = exports.getUserApiKeys = exports.createApiKey = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createApiKey = async (userId, name, keyPrefix, keyHash) => {
    const apiKey = await prisma.apiKey.create({
        data: {
            userId,
            name,
            keyPrefix,
            keyHash
        }
    });
    return apiKey;
};
exports.createApiKey = createApiKey;
const getUserApiKeys = async (userId) => {
    return prisma.apiKey.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getUserApiKeys = getUserApiKeys;
const deleteApiKey = async (userId, keyId) => {
    const deletedKey = await prisma.apiKey.deleteMany({
        where: {
            id: keyId,
            userId: userId
        }
    });
    return deletedKey.count > 0;
};
exports.deleteApiKey = deleteApiKey;
