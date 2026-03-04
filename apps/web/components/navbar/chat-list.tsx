import { MessageSquare, Pin } from "lucide-react";
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

    const pinnedChats = chats.filter(chat => chat.isPinned);
    const regularChats = chats.filter(chat => !chat.isPinned);

    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto gap-1">
            <div className="flex flex-col gap-1.5 relative w-full px-4 pb-4">
                {pinnedChats.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 px-2 py-1">
                            <Pin width={14} height={14} color="#a7a7b8"/>
                            <h3 className="text-xs font-medium text-[#a7a7b8] uppercase tracking-wide">
                                Pinned Chats
                            </h3>
                        </div>
                        {pinnedChats.map((chat) => (
                            <ChatBlock
                                key={chat.id}
                                chat={{
                                    id: chat.id,
                                    title: chat.title,
                                    createdAt: chat.createdAt,
                                    isPinned: chat.isPinned
                                }}
                            />
                        ))}
                    </div>
                )}

                {pinnedChats.length > 0 && regularChats.length > 0 && (
                    <div className="h-px bg-[#2a2a2a] my-2"></div>
                )}

                {regularChats.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                        {regularChats.map((chat) => (
                            <ChatBlock
                                key={chat.id}
                                chat={{
                                    id: chat.id,
                                    title: chat.title,
                                    createdAt: chat.createdAt,
                                    isPinned: chat.isPinned
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* <div className="absolute bottom-[-20px] right-0 blur-[10px] w-full h-[220px] bg-[#0f0f0f]"></div> */}
            </div>
        </div>
    );
};