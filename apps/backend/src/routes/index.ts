import { Router } from "express";
import authRoutes from "../modules/auth.routes";
import gonkaRoutes from "./gonka";
import chatRoutes from "./chat";
import messageRoutes from "./message";

const router = Router();

router.use("/auth", authRoutes);
router.use('/api/gonka', gonkaRoutes);
router.use('/chats', chatRoutes);
router.use('/messages', messageRoutes);


export default router;