'use client'

import { useEffect, useRef } from "react"
import {useChatStore} from "../../store/useChatStore";
import {Logo} from "../ui/logo";


export const ChatWrapper = () => {
    const messages = useChatStore((s) => s.messages)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
        })
    }, [messages])

    const lastMessage = messages[messages.length - 1]
    const showAssistantPlaceholder = lastMessage?.role === "user"

    return (
        <div
            ref={containerRef}
            className="chat-scroll flex-1 overflow-y-auto p-6 space-y-4"
        >
            {messages.length === 0 ? (
                <div className="flex flex-col items-center gap-2 p-10 flex-1">
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
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={`w-fit px-4 py-2 rounded-lg text-sm transition-all duration-200
                            ${
                                m.role === "user"
                                    ? "ml-auto mb-1.5 bg-[#6370E9] text-white"
                                    : "mr-auto bg-[#21232C] text-[#E0E4EB]"
                            }`}
                        >
                            {m.text}
                        </div>
                    ))}

                    {showAssistantPlaceholder && (
                        <div className="mr-auto w-fit px-4 py-2 rounded-lg text-sm bg-[#21232C] text-[#73798C] animate-pulse">
                            Thinking…
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
