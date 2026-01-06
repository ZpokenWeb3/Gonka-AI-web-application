import { ChatSession, PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library";
import { getMessagesBySessionId } from "./message.service";

const prisma = new PrismaClient();

export const createChat = async (
    userId: string,
    options: {
        title?: string,
        model?: string,
        systemPrompt?: string,
        temperature?: number,
        maxTokens?: number
    } = {}
): Promise<ChatSession> => {
    const {
        title = "New Chat",
        model = "Qwen",
        systemPrompt = null,
        temperature = 0.7,
        maxTokens = 4096
    } = options;

    const chatSession = await prisma.chatSession.create({
        data: {
            userId,
            title,
            model,
            systemPrompt,
            temperature: temperature.toString() as unknown as Decimal,
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

export const getUserChats = async (userId: string): Promise<ChatSession[]> => {
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
                select: {messages: true}
            },
        }
    })
}

export const getChatById = async (chatId: string, userId: string): Promise<ChatSession | null> => {
    const chat = await prisma.chatSession.findFirst({
        where: {
            id: chatId,
            userId
        }
    });

    if (!chat) return null;

    // Получаем расшифрованные сообщения
    const messages = await getMessagesBySessionId(chatId);

    return {
        ...chat,
        messages: messages.map(msg => ({
            ...msg,
            attachments: [] // Заглушка для attachments
        }))
    } as any;
}  

export const deleteChatById = async (chatId: string, userId: string) => {
    const chat = await prisma.chatSession.findFirst({
        where: { id: chatId, userId }
    });

    if (!chat) return null;

    return prisma.chatSession.delete({
        where: { id: chatId }
    });
}
