import { Server, Socket } from "socket.io";
import { Matchmaker } from "./matchmaker";

import { Session } from "./types";
import crypto from "crypto";
import {AIBot} from "./ai.bot";

export class SessionManager {
    private sessions = new Map<string, Session>();
    private matchmaker = new Matchmaker();
    private ai = new AIBot();

    constructor(private io: Server) {}

    queuePlayer(socket: Socket) {
        if (this.matchmaker.hasOpponentFor(socket)) {
            const opponent = this.matchmaker.getOpponent();
            if (opponent) {
                this.createHumanMatch(socket, opponent);
                return;
            }
        }

        this.matchmaker.add(socket);

        setTimeout(() => {
            const stillQueued = this.matchmaker.pullIfQueued(socket);
            if (!stillQueued) {
                return;
            }

            this.createAIMatch(socket);
        }, 10_000);
    }

    private createHumanMatch(a: Socket, b: Socket) {
        const id = crypto.randomUUID();

        const session: Session = {
            id,
            status: "playing",
            startedAt: Date.now(),
            messages: [],
            players: [
                { id: a.id, type: "human", movesLeft: 5 },
                { id: b.id, type: "human", movesLeft: 5 },
            ],
        };

        this.sessions.set(id, session);

        a.join(id);
        b.join(id);

        this.io.to(id).emit("game:start", {
            sessionId: id,
            mode: "pvp",
        });
    }

    private createAIMatch(socket: Socket) {
        const id = crypto.randomUUID();

        const session: Session = {
            id,
            status: "playing",
            startedAt: Date.now(),
            messages: [],
            players: [
                { id: socket.id, type: "human", movesLeft: 5 },
                { id: "AI", type: "ai", movesLeft: 5 },
            ],
        };

        this.sessions.set(id, session);

        socket.join(id);

        this.io.to(id).emit("game:start", {
            sessionId: id,
            mode: "ai",
        });

        this.ai.resetConversation();
    }

    async handleMessage(
        socket: Socket,
        sessionId: string,
        text: string
    ) {
        const session = this.sessions.get(sessionId);
        if (!session) return;

        const player = session.players.find(
            p => p.id === socket.id
        );

        if (!player || player.movesLeft <= 0) return;

        player.movesLeft--;

        session.messages.push({
            from: socket.id,
            text,
            time: Date.now(),
        });
        socket.emit("chat:new", {
            from: "you",
            text,
            movesLeft: player.movesLeft,
        });
        socket.to(sessionId).emit("chat:new", {
            from: "opponent",
            text,
            movesLeft: player.movesLeft,
        });

        const ai = session.players.find(p => p.type === "ai");

        if (ai && ai.movesLeft > 0) {
            const typingDelay = 1000 + Math.random() * 2000;

            setTimeout(() => {
                this.io.to(sessionId).emit("chat:typing", { from: "opponent" });
            }, 500);

            try {
                const reply = await this.ai.reply(text);

                ai.movesLeft--;

                session.messages.push({
                    from: "AI",
                    text: reply,
                    time: Date.now(),
                });

                setTimeout(() => {
                    this.io.to(sessionId).emit("chat:new", {
                        from: "opponent",
                        text: reply,
                        movesLeft: ai.movesLeft,
                    });

                    this.checkFinish(session);
                }, typingDelay);

            } catch (error) {
                console.error("AI reply error:", error);
                setTimeout(() => {
                    this.io.to(sessionId).emit("chat:new", {
                        from: "opponent",
                        text: "sorry my internet lagged for a sec, what did u say?",
                        movesLeft: ai.movesLeft,
                    });
                }, typingDelay);
            }
        } else {
            this.checkFinish(session);
        }
    }

    guess(
        socket: Socket,
        sessionId: string,
        guess: "human" | "ai"
    ) {
        const session = this.sessions.get(sessionId);
        if (!session) return;

        const opponent = session.players.find(
            p => p.id !== socket.id
        )!;

        const win = opponent.type === guess;

        session.status = "finished";

        socket.emit("game:end", {
            win,
            correct: opponent.type,
        });

        this.sessions.delete(sessionId);
    }

    private checkFinish(session: Session) {
        const done = session.players.every(
            p => p.movesLeft <= 0
        );

        if (done) {
            this.io.to(session.id).emit("game:guess");
        }
    }
}