"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const database_1 = __importDefault(require("./config/database"));
const start = async () => {
    try {
        await database_1.default.connect();
        const app = (0, app_1.createApp)();
        app.listen(env_1.env.PORT, () => {
            console.log(`Server running on PORT ${env_1.env.PORT}`);
        });
    }
    catch (err) {
        console.error("Failed to start server", err);
        process.exit(1);
    }
};
const shutdown = async () => {
    await database_1.default.disconnect();
    process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
start();
