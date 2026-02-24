import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import {SessionManager} from "../game/session.manager";


export const initSocket = (server: HttpServer) => {
    const allowedOrigins = process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
        : ["http://localhost:3000", "http://127.0.0.1:3000"];

    const io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true,
        },
    });

    const manager = new SessionManager(io);

    io.on("connection", (socket: Socket) => {

        socket.on("game:queue", () => {
            manager.queuePlayer(socket);
        });

        socket.on("chat:send", async (data) => {
            await manager.handleMessage(
                socket,
                data.sessionId,
                data.text
            );
        });

        socket.on("game:guess", (data) => {
            manager.guess(
                socket,
                data.sessionId,
                data.guess
            );
        });

    });
};