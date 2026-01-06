import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as AuthController from "../controllers/auth.controller";

const router = Router();

// Публичные роуты
router.post("/nonce", AuthController.getNonce);
router.post("/verify", AuthController.verifySignature);

// Защищенные роуты (требуют аутентификации)
router.use(authMiddleware);
router.get("/me", AuthController.getMe);
router.put("/profile", AuthController.updateProfile);

export default router;