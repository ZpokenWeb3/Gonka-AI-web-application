import { create } from "zustand";
import { ChatSession, ChatMessage } from "../lib/chat";

export type Message = {
    id: number;
    text: string;
    role: "user" | "assistant";
};

type ChatStore = {
    chats: ChatSession[];
    currentChat: ChatSession | null;
    isLoading: boolean;
    error: string | null;
    
    messages: Message[];
    isActive: boolean; 
    

    loadChats: () => Promise<void>;
    createChat: (title?: string) => Promise<void>;
    selectChat: (chat: ChatSession) => void;
    deleteChat: (chatId: string) => Promise<void>;
    
    sendMessage: (text: string) => void;
    addAssistantMessage: (text: string) => void;
    clear: () => void;
    setActiveChat: (active: boolean) => void; 
};

export const useChatStore = create<ChatStore>((set, get) => ({
    chats: [],
    currentChat: null,
    isLoading: false,
    error: null,
    messages: [],
    isActive: false,

    loadChats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await import("../lib/chat").then(m => m.getChats());
            set({ chats: response.data, isLoading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : "Failed to load chats",
                isLoading: false 
            });
        }
    },

    createChat: async (title?: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await import("../lib/chat").then(m => m.createChat({ title }));
            const newChat = response.data;
            
            set(state => ({ 
                chats: [newChat, ...state.chats],
                currentChat: newChat,
                isLoading: false,
                messages: []
            }));
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : "Failed to create chat",
                isLoading: false 
            });
        }
    },

    selectChat: (chat) => {
        set({ 
            currentChat: chat,
            messages: [],
            isActive: true 
        });
    },

    deleteChat: async (chatId: string) => {
        try {
            await import("../lib/chat").then(m => m.deleteChat(chatId));
            
            set(state => {
                const newChats = state.chats.filter(chat => chat.id !== chatId);
                const newCurrentChat = state.currentChat?.id === chatId ? null : state.currentChat;
                
                return {
                    chats: newChats,
                    currentChat: newCurrentChat,
                    messages: newCurrentChat ? state.messages : []
                };
            });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : "Failed to delete chat"
            });
        }
    },

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
