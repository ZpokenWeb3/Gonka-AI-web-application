import { Router } from "express";
import authRoutes from "./auth";
import gonkaRoutes from "./gonka";
import chatRoutes from "./chat";
import messageRoutes from "./message";
import developerRoutes from "./developer.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use('/api/gonka', gonkaRoutes);
router.use('/chats', chatRoutes);
router.use('/messages', messageRoutes);
router.use('/developer', developerRoutes);

export default router;