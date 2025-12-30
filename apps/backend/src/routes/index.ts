import { Router } from "express";
import authRoutes from "../modules/auth.routes";
import gonkaRoutes from "./gonka";
import chatRoutes from "./chat";

const router = Router();

router.use("/auth", authRoutes);
router.use('/api/gonka', gonkaRoutes);
router.use('/chats', chatRoutes);

export default router;