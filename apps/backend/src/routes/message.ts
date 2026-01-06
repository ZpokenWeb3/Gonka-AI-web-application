import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { sendMessage, getMessages, deleteMessageById } from "../controllers/message.controller";

const router = Router();

// Все роуты требуют аутентификации
router.use(authMiddleware);

// Отправить сообщение и получить ответ от Gonka API
router.post("/send", sendMessage);

// Получить все сообщения в сессии
router.get("/session/:sessionId", getMessages);

// Удалить сообщение по ID
router.delete("/:messageId", deleteMessageById);

export default router;