'use client'

import { Bot, Send, User } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import type { TuringTwistMessage } from "../../lib/turing-twist-types";

interface Props {
    messages: TuringTwistMessage[];
    onSend: (text: string) => void;
    onGuess: (value: "ai" | "human") => void;
    canGuess: boolean;
    onTimeout: () => void;
}

export const ChatTuringForm = ({ messages, onSend, onGuess, canGuess, onTimeout }: Props) => {
    const [text, setText] = useState("");
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isYourTurn, setIsYourTurn] = useState(false);

    const movesLeft = useMemo(() => {
        const lastWithMoves = [...messages].reverse().find((m) => typeof m.movesLeft === "number");
        return lastWithMoves?.movesLeft;
    }, [messages]);

    const lastNonSystemMessage = useMemo(
        () => [...messages].reverse().find((m) => m.from !== "system") ?? null,
        [messages]
    );

    useEffect(() => {
        const canChat = typeof movesLeft === "number" ? movesLeft > 0 : true;
        if (!canChat || canGuess) {
            setIsYourTurn(false);
            setTimeLeft(null);
            return;
        }

        if (!lastNonSystemMessage) {
            setIsYourTurn(true);
            return;
        }

        const yourTurnNow = lastNonSystemMessage.from !== "you";
        setIsYourTurn(yourTurnNow);
    }, [lastNonSystemMessage, movesLeft, canGuess]);

    useEffect(() => {
        if (!isYourTurn) {
            setTimeLeft(null);
            return;
        }

        setTimeLeft(15);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === null) return null;
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [isYourTurn, lastNonSystemMessage?.id]);

    const submit = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText("");
    };

    return (
        <div className="flex flex-col w-[900px] h-[700px] bg-[#151518] rounded-md">
            <div className="flex items-center justify-between text-[20px] text-white font-semibold py-5 px-10">
                <span>TURING TWIST</span>
                {isYourTurn && typeof timeLeft === "number" && (
                    <span className="text-sm font-normal text-red-400">
                        Your turn — {timeLeft} s
                    </span>
                )}
            </div>
            <div className="flex-1 overflow-y-auto px-10 pb-4">
                <div className="flex flex-col gap-3">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={[
                                "max-w-[75%] rounded-md px-3 py-2 text-sm leading-relaxed",
                                m.from === "you"
                                    ? "ml-auto bg-[#6B26D9] text-white"
                                    : m.from === "system"
                                      ? "mx-auto bg-[#232328] text-white/90"
                                      : "mr-auto bg-[#232328] text-white",
                            ].join(" ")}
                        >
                            <div className="whitespace-pre-wrap">{m.text}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center w-full gap-7 py-10 px-10">
                <div className="flex items-center w-full gap-2">
                    <Button
                        className="w-fit h-full"
                        variant="destructive"
                        disabled={!canGuess}
                        onClick={() => onGuess("ai")}
                    >
                        <Bot color="#ffffff"/>
                        AI
                    </Button>
                    <Button
                        className="w-fit h-full"
                        variant="destructive"
                        disabled={!canGuess}
                        onClick={() => onGuess("human")}
                    >
                        <User color="#ffffff"/>
                        Human
                    </Button>
                    <input
                        placeholder="Enter your message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") submit();
                        }}
                        className="flex-1 text-sm text-white outline-none px-3 py-2.5 bg-[#232328] rounded-sm"
                    />

                    <button
                        onClick={submit}
                        disabled={!text.trim() || (typeof movesLeft === "number" && movesLeft <= 0)}
                        className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-[8px] bg-[#6B26D9] disabled:opacity-50 transition-all duration-300"
                    >
                        <Send width={15} height={15} color="#fff"/>
                    </button>
                </div>
            </div>
        </div>
    )
}