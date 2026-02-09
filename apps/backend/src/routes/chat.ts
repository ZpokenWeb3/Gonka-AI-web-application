import { Router } from "express";
import {createChat, deleteChat, getChat, getChats, sendMessage, updateChat} from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post('/', createChat);
router.get('/', getChats);
router.get('/:id', getChat);
router.delete('/:id', deleteChat);
router.post('/:id/send', sendMessage);
router.patch('/:id/update', updateChat);

export default router;