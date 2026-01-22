"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth.routes"));
const gonka_1 = __importDefault(require("./gonka"));
const chat_1 = __importDefault(require("./chat"));
const message_1 = __importDefault(require("./message"));
const developer_routes_1 = __importDefault(require("./developer.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use('/api/gonka', gonka_1.default);
router.use('/chats', chat_1.default);
router.use('/messages', message_1.default);
router.use('/developer', developer_routes_1.default);
exports.default = router;
