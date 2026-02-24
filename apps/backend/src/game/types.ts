export type PlayerType = "human" | "ai";

export interface Player {
    id: string;
    type: PlayerType;
    movesLeft: number;
}

export interface Session {
    id: string;
    players: Player[];
    messages: ChatMessage[];
    startedAt: number;
    status: "waiting" | "playing" | "finished";
}

export interface ChatMessage {
    from: string;
    text: string;
    time: number;
}
