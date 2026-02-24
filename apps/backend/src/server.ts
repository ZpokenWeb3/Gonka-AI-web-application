import { createServer } from "http";
import { createApp } from "./app";
import { env } from "./config/env";
import DatabaseService from "./config/database";
import { initSocket } from "./socket/socket.server";

const start = async () => {
    try {
        await DatabaseService.connect();

        const app = createApp();
        const httpServer = createServer(app);

        initSocket(httpServer);

        httpServer.listen(env.BACKEND_PORT, () => {
            console.log(`Server running on PORT ${env.BACKEND_PORT}`);
        });

    } catch (err) {
        console.error("Failed to start server", err);
        process.exit(1);
    }
};

const shutdown = async () => {
    await DatabaseService.disconnect();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
