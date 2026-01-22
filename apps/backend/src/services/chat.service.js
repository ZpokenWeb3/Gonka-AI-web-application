"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChatById = exports.getChatById = exports.getUserChats = exports.createChat = void 0;
const client_1 = require("@prisma/client");
const message_service_1 = require("./message.service");
const user_service_1 = require("./user.service");
const prisma = new client_1.PrismaClient();
const createChat = async (userId, options = {}) => {
    try {
        await (0, user_service_1.getCurrentUser)(userId);
    }
    catch (error) {
        throw new Error(`User with ID ${userId} not found`);
    }
    const { title = "New Chat", model = "Qwen", systemPrompt = null, temperature = 0.7, maxTokens = 4096 } = options;
    const chatSession = await prisma.chatSession.create({
        data: {
            userId,
            title,
            model,
            systemPrompt,
            temperature: temperature.toString(),
            maxTokens,
            isPinned: false,
            isArchived: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        include: {
            messages: false
        }
    });
    return chatSession;
};
exports.createChat = createChat;
const getUserChats = async (userId) => {
    return prisma.chatSession.findMany({
        where: {
            userId,
            isArchived: false
        },
        orderBy: {
            updatedAt: 'desc'
        },
        include: {
            _count: {
                select: { messages: true }
            },
        }
    });
};
exports.getUserChats = getUserChats;
const getChatById = async (chatId, userId) => {
    const chat = await prisma.chatSession.findFirst({
        where: {
            id: chatId,
            userId
        }
    });
    if (!chat)
        return null;
    const messages = await (0, message_service_1.getMessagesBySessionId)(chatId);
    return {
        ...chat,
        messages: messages.map(msg => ({
            ...msg,
            attachments: []
        }))
    };
};
exports.getChatById = getChatById;
const deleteChatById = async (chatId, userId) => {
    const chat = await prisma.chatSession.findFirst({
        where: { id: chatId, userId }
    });
    if (!chat)
        return null;
    return prisma.chatSession.delete({
        where: { id: chatId }
    });
};
exports.deleteChatById = deleteChatById;
