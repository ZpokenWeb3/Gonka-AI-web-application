'use client'

import {Paperclip, Send} from "lucide-react";
import { useState } from "react";
import {useChatStore} from "../../store/useChatStore";
import { sendGonkaChatMessage } from "../../lib/gonkaClient";
import {Modal} from "../ui/modal";
import {AttachForm} from "./attach-form";

interface InputProps {
    chatId?: string;
}

export const Input = ({ chatId }: InputProps) => {
    const [value, setValue] = useState("");
    const [isModal, setIsModal] = useState(false);
    const sendMessage = useChatStore((s) => s.sendMessage);

    const addAssistantMessage = useChatStore((s) => s.addAssistantMessage);

    const send = async () => {
        if (!value.trim() || !chatId) return;
        const text = value;
        sendMessage(text);
        setValue("");

        try {
            const data = await sendGonkaChatMessage(text, chatId);
            const content = data.choices?.[0]?.message?.content;
            if (content) {
                addAssistantMessage(content);
            } else {
                addAssistantMessage("[No response from AI]");
            }
        } catch (err) {
            console.error("Failed to send Gonka chat message", err);
            addAssistantMessage("[Error receiving response from AI]");
        }
    };

    return (
        <div className="flex items-center justify-between md:w-[90%] w-full bg-[#17111c] border border-[#21232C] focus-within:border-[#6B26D9] py-2 px-3 rounded-[12px]">
            <Paperclip onClick={() => setIsModal(true)} width={18} height={18} className="mr-5 cursor-pointer" color="#ffffff" />

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
                className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-[8px] bg-[#6B26D9] disabled:opacity-50 transition-all duration-300"
            >
                <Send width={15} height={15} color="#fff" />
            </button>

            {isModal && (
                <Modal isOpen={isModal} onClose={() => setIsModal(false)} form={ <AttachForm/> }/>
            )}
        </div>
    );
};
