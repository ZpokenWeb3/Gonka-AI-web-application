"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gonkaChatController = gonkaChatController;
exports.gonkaEndpointsController = gonkaEndpointsController;
const gonka_service_1 = require("../services/gonka.service");
async function gonkaChatController(req, res) {
    try {
        const { message, model } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Message is required and must be a string',
            });
        }
        const response = await (0, gonka_service_1.gonkaChat)(message, model);
        return res.json(response);
    }
    catch (error) {
        console.error('Gonka chat error:', error);
        return res.status(500).json({
            error: 'Failed to send message to Gonka',
            message: error instanceof Error ? error.message : String(error),
        });
    }
}
async function gonkaEndpointsController(_req, res) {
    try {
        const endpoints = await (0, gonka_service_1.gonkaGetEndpoints)();
        return res.json({ endpoints });
    }
    catch (error) {
        console.error('Gonka endpoints error:', error);
        return res.status(500).json({
            error: 'Failed to get endpoints',
            message: error instanceof Error ? error.message : String(error),
        });
    }
}
