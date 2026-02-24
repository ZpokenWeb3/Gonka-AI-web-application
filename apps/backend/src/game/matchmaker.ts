import { Socket } from "socket.io";

export class Matchmaker {
    private queue: Socket[] = [];

    add(socket: Socket) {
        if (!this.isQueued(socket)) {
            this.queue.push(socket);
        }
    }

    remove(socket: Socket) {
        this.queue = this.queue.filter((s) => s.id !== socket.id);
    }

    isQueued(socket: Socket): boolean {
        return this.queue.some((s) => s.id === socket.id);
    }

    getOpponent(): Socket | null {
        return this.queue.shift() ?? null;
    }

    getMatch(): [Socket, Socket] | null {
        if (this.queue.length >= 2) {
            return [
                this.queue.shift()!,
                this.queue.shift()!,
            ];
        }

        return null;
    }

    getSingle(): Socket | null {
        return this.queue.shift() ?? null;
    }

    hasOpponent(): boolean {
        return this.queue.length > 0;
    }

    hasOpponentFor(socket: Socket): boolean {
        return this.queue.some((s) => s.id !== socket.id);
    }

    pullIfQueued(socket: Socket): boolean {
        const wasQueued = this.isQueued(socket);
        if (wasQueued) {
            this.remove(socket);
        }
        return wasQueued;
    }
}
