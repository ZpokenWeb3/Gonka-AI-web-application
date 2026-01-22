"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageById = exports.getMessages = exports.sendMessage = void 0;
const message_service_1 = require("../services/message.service");
const sendMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { sessionId, message, model } = req.body;
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
const getMessages = async (req, res) => {
    try {
        const userId = req.userId;
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Session ID is required",
            });
        }
        const messages = await (0, message_service_1.getMessagesBySessionId)(sessionId);
        return res.json({
            success: true,
            data: messages,
        });
    }
    catch (error) {
        console.error("Failed to get messages:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get messages",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getMessages = getMessages;
const deleteMessageById = async (req, res) => {
    try {
        const userId = req.userId;
        const { messageId } = req.params;
        if (!messageId) {
            return res.status(400).json({
                success: false,
                message: "Message ID is required",
            });
        }
        const message = await (0, message_service_1.deleteMessage)(messageId);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }
        return res.json({
            success: true,
            data: message,
        });
    }
    catch (error) {
        console.error("Failed to delete message:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete message",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.deleteMessageById = deleteMessageById;
