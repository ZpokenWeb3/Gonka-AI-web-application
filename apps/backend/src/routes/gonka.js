"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gonka_controller_1 = require("../controllers/gonka.controller");
const router = (0, express_1.Router)();
router.post('/chat', gonka_controller_1.gonkaChatController);
router.get('/endpoints', gonka_controller_1.gonkaEndpointsController);
exports.default = router;
