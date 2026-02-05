import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createKey, deleteKey, getKeys } from "../controllers/developer.controller";

const router = Router();

router.use(authMiddleware);

router.post("/keys", createKey);
router.get("/keys", getKeys);
router.delete("/keys/:id", deleteKey);

export default router;
