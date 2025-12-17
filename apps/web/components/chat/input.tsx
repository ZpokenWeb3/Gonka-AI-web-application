'use client'

import { Send } from "lucide-react";
import { useState } from "react";
import {useChatStore} from "../../store/useChatStore";


export const Input = () => {
    const [value, setValue] = useState("");
    const sendMessage = useChatStore((s) => s.sendMessage);

    const send = () => {
        if (!value.trim()) return;
        sendMessage(value);
        setValue("");
    };

    return (
        <div className="flex items-center justify-between w-[90%] bg-[#17111c] border border-[#21232C] focus-within:border-[#6a1bbf] py-2 px-3 rounded-[12px]">
            <input
                placeholder="Enter your message"
                className="w-full text-sm text-white outline-none bg-transparent"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
            />

            <button
                onClick={send}
                disabled={!value.trim()}
                className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-[8px] bg-[#6a1bbf] disabled:opacity-50 transition-all duration-300"
            >
                <Send width={15} height={15} color="#fff" />
            </button>
        </div>
    );
};
