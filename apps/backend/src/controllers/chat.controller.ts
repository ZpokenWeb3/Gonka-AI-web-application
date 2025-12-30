import { Request, Response } from "express";
import { createChat as createChatService, deleteChatById, getChatById, getUserChats } from "../services/chat.service";
import { success } from "zod";

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

