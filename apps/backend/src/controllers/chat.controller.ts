import { Request, Response } from "express";
import {
    createChat as createChatService,
    deleteChatById,
    getChatById,
    getUserChats,
    updateChatInfo
} from "../services/chat.service";
import { sendMessageAndGetResponse } from "../services/message.service";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const createChat = async (req: Request, res: Response) => {
    try {
        const userId = req.userId!;

        const {
            title,
            model,
            systemPrompt,
            temperature,
            maxTokens
        } = req.body;

        const chat = await createChatService(userId, {
            title,
            model,
            systemPrompt,
            temperature,
            maxTokens
        });

        return res.status(201).json({
            success: true,
            data: chat
        });

    } catch (err) {
        console.error("Failed to create a new chat", err);
        return res.status(500).json({
            success: false, 
            message: 'Failed to create chat', 
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
}

export const getChats = async (req: Request, res: Response) => {
    try {
        const userId = req.userId!;

        const chats = await getUserChats(userId);

        return res.json({
            success: true,
            data: chats
        });
    } catch (err) {
        console.error("Failed to get chats", err);
        return res.status(500).json({
            success: false,
            message: "Failed to get chats",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
}

export const getChat = async (req: Request, res: Response) => {
    try {
        const userId = req.userId!;
        const { id } = req.params;

        const chat = await getChatById(id, userId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found or access denied'
            });
        }

        return res.json({
            success: true,
            data: chat
        });
    } catch (err) {
        console.error("Failed to get chat", err);
        return res.status(500).json({
            success: false,
            message: "Failed to get chat",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
}

export const deleteChat = async(req: Request, res: Response) => {
    try{
        const userId = req.userId!;
        const {id} = req.params;

        const chat = await deleteChatById(id, userId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found or access denied'
            });
        }

        return res.json({
            success: true,
            data: chat
        });

    } catch(err){
        console.error("Failed to delete chat", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete chat",
            error: err instanceof Error ? err.message : 'Unknown error'
        })
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const userId = req.userId!;
        const { id: sessionId } = req.params;
        const { message, model } = req.body;

        if (!sessionId || !message) {
            return res.status(400).json({
                success: false,
                message: "Session ID and message are required",
            });
        }

        if (typeof message !== "string") {
            return res.status(400).json({
                success: false,
                message: "Message must be a string",
            });
        }

        const result = await sendMessageAndGetResponse({
            sessionId,
            userMessage: message,
            model,
        });

        return res.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error("Failed to send message:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export const updateChat = async (req: Request, res: Response) => {
    try {
        const userId = req.userId!;
        const { id } = req.params;
        const { isPinned, title } = req.body;

        if (typeof isPinned !== "boolean" || typeof title !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid data format",
            });
        }

        const chat = await updateChatInfo(id, userId, isPinned, title);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found or access denied",
            });
        }

        return res.json({
            success: true,
            data: chat,
        });
    } catch (error) {
        console.error("Failed to update chat:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update chat",
        });
    }
};


