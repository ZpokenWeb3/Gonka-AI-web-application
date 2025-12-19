import { Router } from "express";
import authRoutes from "./auth";
import gonkaRoutes from "./gonka";

const router = Router();

router.use("/auth", authRoutes);
router.use('/api/gonka', gonkaRoutes);

export default router;