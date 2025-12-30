import { Router } from "express";
import { createChat, deleteChat, getChat, getChats } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post('/', createChat);
router.get('/', getChats);
router.get('/:id', getChat);
router.delete('/:id', deleteChat)

export default router;