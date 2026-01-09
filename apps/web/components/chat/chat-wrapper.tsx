'use client'

import { useEffect, useRef, useState } from "react"
import {useChatStore} from "../../store/useChatStore";
import {Logo} from "../ui/logo";
import { BottomSection } from "./bottom-section";
import { useChat } from "../../hooks/useChats";

interface ChatWrapperProps {
    chatId?: string;
}

export const ChatWrapper = ({ chatId }: ChatWrapperProps) => {
    const messages = useChatStore((s) => s.messages)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [typingText, setTypingText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    
    const { data: chatData, isLoading: chatLoading } = useChat(chatId || "");

    useEffect(() => {
        if (!containerRef.current) return
        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
        })
    }, [messages, typingText])

    useEffect(() => {
        const last = messages[messages.length - 1];
        if (last && last.role === "assistant") {
            setTypingText("");
            setIsTyping(true);
            let i = 0;
            const interval = setInterval(() => {
                setTypingText(last.text.slice(0, i + 1));
                i++;
                if (i >= last.text.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 18);
            return () => clearInterval(interval);
        } else {
            setTypingText("");
            setIsTyping(false);
        }
    }, [messages]);

    const lastMessage = messages[messages.length - 1]
    const showAssistantPlaceholder = lastMessage?.role === "user"

    if (chatLoading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="animate-pulse">Loading chat...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full flex-1">
            <div
                ref={containerRef}
                className="chat-scroll overflow-y-auto p-6 flex-1 space-y-4"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 p-10">
                        <Logo size={80} />
                        <h3 className="text-[35px] text-[#E0E4EB] font-semibold">
                            GONka
                        </h3>
                        <p className="text-sm font-medium text-[#73798C]">
                            Private AI. No limits. No traces.
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((m, idx) => {
                            const isLastAssistant =
                                m.role === "assistant" && idx === messages.length - 1;
                            return (
                                <div
                                    key={m.id}
                                    className={`w-fit px-4 py-2 rounded-lg text-sm transition-all duration-200
                                    ${
                                        m.role === "user"
                                            ? "ml-auto mb-1.5 bg-[#6370E9] text-white"
                                            : "mr-auto bg-[#21232C] text-[#E0E4EB]"
                                    }`}
                                >
                                    {isLastAssistant && isTyping ? typingText : m.text}
                                </div>
                            );
                        })}

                        {showAssistantPlaceholder && (
                            <div className="mr-auto w-fit px-4 py-2 rounded-lg text-sm bg-[#21232C] text-[#73798C] animate-pulse">
                                Thinking…
                            </div>
                        )}
                    </>
                )}
            </div>
            <BottomSection/>
        </div>
    )
}
