'use client'

import {FirstForm} from "../../components/turing-twist/first-form";
import {ChatTuringForm} from "../../components/turing-twist/chat-turing-form";
import {useEffect, useMemo, useState} from "react";
import { getTuringTwistSocket } from "../../lib/turing-twist-socket";
import type { TuringTwistMessage } from "../../lib/turing-twist-types";

export default function TuringTwistPage() {
    const [isPlay, setPlay] = useState(false);
    const [isQueueing, setQueueing] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<TuringTwistMessage[]>([]);
    const [canGuess, setCanGuess] = useState(false);

    const socket = useMemo(() => {
        return getTuringTwistSocket();
    }, []);

    useEffect(() => {
        const onGameStart = (data: { sessionId: string; mode: "pvp" | "ai" }) => {
            setSessionId(data.sessionId);
            setPlay(true);
            setQueueing(false);
            setCanGuess(false);
            setMessages([]);
        };

        const onChatNew = (msg: { from: string; text: string; movesLeft?: number }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `m-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                    from: msg.from === "ai" ? "ai" : (msg.from === "you" ? "you" : "opponent"),
                    text: msg.text,
                    time: Date.now(),
                    movesLeft: msg.movesLeft,
                },
            ]);
        };

        const onGameGuess = () => {
            setCanGuess(true);
        };

        const onGameEnd = (data: { win: boolean; correct: "human" | "ai" }) => {
            setCanGuess(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: `system-end-${Date.now()}`,
                    from: "system",
                    text: data.win
                        ? `You win! Correct: ${data.correct}`
                        : `You lose. Correct: ${data.correct}`,
                    time: Date.now(),
                },
            ]);

            if (data.correct === "ai") {
                setTimeout(() => {
                    setPlay(false);
                    setSessionId(null);
                }, 3000);
            }
        };

        socket.on("game:start", onGameStart);
        socket.on("chat:new", onChatNew);
        socket.on("game:guess", onGameGuess);
        socket.on("game:end", onGameEnd);

        return () => {
            socket.off("game:start", onGameStart);
            socket.off("chat:new", onChatNew);
            socket.off("game:guess", onGameGuess);
            socket.off("game:end", onGameEnd);
        };
    }, [socket]);

    const startQueue = () => {
        setQueueing(true);
        setMessages([]);
        setSessionId(null);
        setCanGuess(false);

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("game:queue");
    };

    const sendMessage = (text: string) => {
        if (!sessionId) return;

        socket.emit("chat:send", { sessionId, text });
    };

    const guess = (value: "ai" | "human") => {
        if (!sessionId) return;
        socket.emit("game:guess", { sessionId, guess: value });
    };

    const handleTimeout = () => {
        setPlay(false);
        setSessionId(null);
        setCanGuess(false);
        setMessages((prev) => [
            ...prev,
            {
                id: `system-timeout-${Date.now()}`,
                from: "system",
                text: "Game finished: время на ход истекло",
                time: Date.now(),
            },
        ]);
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-15 p-10 w-full overflow-y-auto h-full`}>
            {!isPlay && (
                <FirstForm setPlay={setPlay} onQueueStart={startQueue} isQueueing={isQueueing}/>
            )}
            {isPlay && (
                <ChatTuringForm
                    messages={messages}
                    onSend={sendMessage}
                    onGuess={guess}
                    canGuess={canGuess}
                    onTimeout={handleTimeout}
                />
            )}
        </div>
    );
}
