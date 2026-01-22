"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.getMessageById = exports.getMessagesBySessionId = exports.sendMessageAndGetResponse = exports.createMessage = void 0;
const client_1 = require("@prisma/client");
const encryption_1 = require("../utils/encryption");
const gonka_service_1 = require("./gonka.service");
const prisma = new client_1.PrismaClient();
const createMessage = async (params) => {
    const { content, ...otherParams } = params;
    const { ciphertextB64, nonceB64 } = (0, encryption_1.encrypt)(content);
    const contentHash = (0, encryption_1.computeContentHash)(content);
    return prisma.message.create({
        data: {
            ...otherParams,
            contentEncrypted: ciphertextB64,
            nonce: nonceB64,
            contentHash,
        },
    });
};
exports.createMessage = createMessage;
const sendMessageAndGetResponse = async ({ sessionId, userMessage, model = "Qwen/Qwen3-32B-FP8", }) => {
    const startTime = Date.now();
    try {
        const gonkaResponse = await (0, gonka_service_1.gonkaChat)(userMessage, model);
        const assistantMessage = gonkaResponse.choices?.[0]?.message?.content || "";
        const endTime = Date.now();
        const latencyMs = endTime - startTime;
        const userMessageData = await (0, exports.createMessage)({
            sessionId,
            role: client_1.MessageRole.USER,
            content: userMessage,
            model,
            promptTokens: gonkaResponse.usage?.prompt_tokens,
            completionTokens: gonkaResponse.usage?.completion_tokens,
            totalTokens: gonkaResponse.usage?.total_tokens,
            costGnk: gonkaResponse.usage?.total_tokens ?
                parseFloat((gonkaResponse.usage.total_tokens * 0.00001).toFixed(8)) : undefined,
            latencyMs,
        });
        const assistantMessageData = await (0, exports.createMessage)({
            sessionId,
            role: client_1.MessageRole.ASSISTANT,
            content: assistantMessage,
            model,
            promptTokens: gonkaResponse.usage?.prompt_tokens,
            completionTokens: gonkaResponse.usage?.completion_tokens,
            totalTokens: gonkaResponse.usage?.total_tokens,
            costGnk: gonkaResponse.usage?.total_tokens ?
                parseFloat((gonkaResponse.usage.total_tokens * 0.00001).toFixed(8)) : undefined,
            latencyMs,
            finishReason: gonkaResponse.choices?.[0]?.finish_reason,
        });
        await prisma.chatSession.update({
            where: { id: sessionId },
            data: {
                lastMessageAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return {
            userMessage: {
                id: userMessageData.id,
                role: userMessageData.role,
                content: userMessage,
                createdAt: userMessageData.createdAt,
            },
            assistantMessage: {
                id: assistantMessageData.id,
                role: assistantMessageData.role,
                content: assistantMessage,
                createdAt: assistantMessageData.createdAt,
            },
            usage: gonkaResponse.usage,
            model: gonkaResponse.model,
            latencyMs,
        };
    }
    catch (error) {
        console.error("Error in sendMessageAndGetResponse:", error);
        await (0, exports.createMessage)({
            sessionId,
            role: client_1.MessageRole.USER,
            content: userMessage,
            model,
            latencyMs: Date.now() - startTime,
        });
        throw error;
    }
};
exports.sendMessageAndGetResponse = sendMessageAndGetResponse;
const getMessagesBySessionId = async (sessionId) => {
    const messages = await prisma.message.findMany({
        where: { sessionId },
        orderBy: { createdAt: "asc" },
    });
    return messages.map((m) => {
        const decryptedContent = (0, encryption_1.decrypt)(m.contentEncrypted, m.nonce);
        if (m.contentHash) {
            if (!(0, encryption_1.verifyContentIntegrity)(decryptedContent, m.contentHash)) {
                console.error(`Data integrity violation for message ${m.id}`);
                throw new Error(`Message ${m.id} has been tampered with or corrupted`);
            }
        }
        else {
            console.warn(`Message ${m.id} has no contentHash (legacy data)`);
        }
        return {
            ...m,
            decryptedContent,
        };
    });
};
exports.getMessagesBySessionId = getMessagesBySessionId;
const getMessageById = async (messageId) => {
    const message = await prisma.message.findUnique({
        where: { id: messageId },
    });
    if (!message)
        return null;
    const decryptedContent = (0, encryption_1.decrypt)(message.contentEncrypted, message.nonce);
    if (message.contentHash) {
        if (!(0, encryption_1.verifyContentIntegrity)(decryptedContent, message.contentHash)) {
            console.error(`Data integrity violation for message ${message.id}`);
            throw new Error(`Message ${message.id} has been tampered with or corrupted`);
        }
    }
    else {
        console.warn(`Message ${message.id} has no contentHash (legacy data)`);
    }
    return {
        ...message,
        decryptedContent,
    };
};
exports.getMessageById = getMessageById;
const deleteMessage = async (messageId) => {
    try {
        return await prisma.message.delete({
            where: { id: messageId },
        });
    }
    catch (error) {
        console.error("Error deleting message:", error);
        return null;
    }
};
exports.deleteMessage = deleteMessage;
