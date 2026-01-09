import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { sendMessage, getMessages, deleteMessageById } from "../controllers/message.controller";

const router = Router();

router.use(authMiddleware);

router.post("/send", sendMessage);
router.get("/session/:sessionId", getMessages);
router.delete("/:messageId", deleteMessageById);

export default router;