'use client'

import { Send } from "lucide-react";
import { useState } from "react";
import {useChatStore} from "../../store/useChatStore";
import { sendGonkaChatMessage } from "../../lib/gonkaClient";

export const Input = () => {
    const [value, setValue] = useState("");
    const sendMessage = useChatStore((s) => s.sendMessage);

    const send = async () => {
        if (!value.trim()) return;
        const text = value;
        sendMessage(text);
        setValue("");

        try {
            await sendGonkaChatMessage(text);
        } catch (err) {
            console.error("Failed to send Gonka chat message", err);
        }
    };

    return (
        <div className="flex items-center justify-between w-[90%] bg-[#17111c] border border-[#21232C] focus-within:border-[#6a1bbf] py-2 px-3 rounded-[12px]">
            <input
                placeholder="Enter your message"
                className="w-full text-sm text-white outline-none bg-transparent"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void send()}
            />

            <button
                onClick={() => void send()}
                disabled={!value.trim()}
                className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-[8px] bg-[#6a1bbf] disabled:opacity-50 transition-all duration-300"
            >
                <Send width={15} height={15} color="#fff" />
            </button>
        </div>
    );
};
