import { MessageSquare } from "lucide-react";
import { ChatBlock } from "./chat-block";
import { useChats } from "../../hooks/useChats";

export const ChatList = () => {
    const { data: chatsData, isLoading, error, refetch } = useChats();
    const chats = chatsData?.data || [];

    if (isLoading && chats.length === 0) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-[#a7a7b8]">Loading chats...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center gap-2">
                <MessageSquare width={30} height={30} color="#ef4444" />
                <p className="text-xs text-red-400">Error: {error.message}</p>
                <button 
                    onClick={() => refetch()}
                    className="text-xs text-blue-400 hover:text-blue-300"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (chats.length === 0) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center gap-2">
                <MessageSquare width={30} height={30} color="#a7a7b8" />
                <h4 className="text-sm text-[#a7a7b8]">No chats</h4>
                <p className="text-xs text-[#a7a7b8]">Create a new chat to get started</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 gap-1">
            <div className="flex flex-col gap-1.5 relative w-full px-4">
                
                {chats.map((chat) => (
                    <ChatBlock 
                        key={chat.id} 
                        chat={{
                            id: chat.id,
                            title: chat.title,
                            createdAt: chat.createdAt
                        }}
                    />
                ))}

                {/* <div className="absolute bottom-[-20px] right-0 blur-[10px] w-full h-[220px] bg-[#0f0f0f]"></div> */}
            </div>
        </div>
    );
};
