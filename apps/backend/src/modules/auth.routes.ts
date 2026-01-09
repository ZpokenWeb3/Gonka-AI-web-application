import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMe, getNonce, updateProfile, verifySignature } from "../controllers/auth.controller";

const router = Router();

router.post("/nonce", getNonce);
router.post("/verify", verifySignature);

router.use(authMiddleware);
router.get("/me", getMe);
router.put("/profile", updateProfile);

export default router;