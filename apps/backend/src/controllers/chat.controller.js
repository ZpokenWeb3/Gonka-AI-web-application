"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.deleteChat = exports.getChat = exports.getChats = exports.createChat = void 0;
const chat_service_1 = require("../services/chat.service");
const message_service_1 = require("../services/message.service");
const createChat = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, model, systemPrompt, temperature, maxTokens } = req.body;
        const chat = await (0, chat_service_1.createChat)(userId, {
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
    }
    catch (err) {
        console.error("Failed to create a new chat", err);
        return res.status(500).json({
            success: false,
            message: 'Failed to create chat',
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
};
exports.createChat = createChat;
const getChats = async (req, res) => {
    try {
        const userId = req.userId;
        const chats = await (0, chat_service_1.getUserChats)(userId);
        return res.json({
            success: true,
            data: chats
        });
    }
    catch (err) {
        console.error("Failed to get chats", err);
        return res.status(500).json({
            success: false,
            message: "Failed to get chats",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
};
exports.getChats = getChats;
const getChat = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const chat = await (0, chat_service_1.getChatById)(id, userId);
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
    }
    catch (err) {
        console.error("Failed to get chat", err);
        return res.status(500).json({
            success: false,
            message: "Failed to get chat",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
};
exports.getChat = getChat;
const deleteChat = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const chat = await (0, chat_service_1.deleteChatById)(id, userId);
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
    }
    catch (err) {
        console.error("Failed to delete chat", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete chat",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
};
exports.deleteChat = deleteChat;
const sendMessage = async (req, res) => {
    try {
        const userId = req.userId;
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
        const result = await (0, message_service_1.sendMessageAndGetResponse)({
            sessionId,
            userMessage: message,
            model,
        });
        return res.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error("Failed to send message:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.sendMessage = sendMessage;
