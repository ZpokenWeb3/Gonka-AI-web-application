import {Router} from "express";
import * as AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/nonce", AuthController.getNonce);
router.post("/verify", AuthController.verifySignature);

export default router;