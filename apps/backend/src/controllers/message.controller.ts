import { Request, Response } from "express";
import { 
  sendMessageAndGetResponse, 
  getMessagesBySessionId, 
  deleteMessage 
} from "../services/message.service";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
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
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    const messages = await getMessagesBySessionId(sessionId);

    return res.json({
      success: true,
      data: messages,
    });

  } catch (error) {
    console.error("Failed to get messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get messages",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteMessageById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { messageId } = req.params;

    if (!messageId) {
      return res.status(400).json({
        success: false,
        message: "Message ID is required",
      });
    }

    const message = await deleteMessage(messageId);

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

  } catch (error) {
    console.error("Failed to delete message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};