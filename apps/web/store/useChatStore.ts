import { create } from "zustand";

export type Message = {
    id: number;
    text: string;
    role: "user" | "assistant";
};

type ChatStore = {
    messages: Message[];
    isActive: boolean; 
    sendMessage: (text: string) => void;
    addAssistantMessage: (text: string) => void;
    clear: () => void;
    setActiveChat: (active: boolean) => void; 
};

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    isActive: false, 

    sendMessage: (text) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: Date.now(),
                    text,
                    role: "user",
                },
            ],
        })),

    addAssistantMessage: (text) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: Date.now(),
                    text,
                    role: "assistant",
                },
            ],
        })),

    clear: () => set({ messages: [] }),

    setActiveChat: (active) => set({ isActive: active }), 
}));
