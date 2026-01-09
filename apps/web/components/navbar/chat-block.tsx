import { Trash2, MessageSquare } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useDeleteChat } from "../../hooks/useChats";

interface ChatBlockProps {
    chat?: {
        id: string;
        title: string;
        createdAt: string;
    };
}

export const ChatBlock = ({ chat }: ChatBlockProps) => {
    const router = useRouter();
    const params = useParams();
    const deleteChatMutation = useDeleteChat();
    const currentChatId = params.id as string;

    const handleClick = () => {
        if (chat) {
            router.push(`/chat/${chat.id}`);
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (chat) {
            deleteChatMutation.mutate(chat.id);
        }
    };

    const isActive = currentChatId === chat?.id;

    return (
        <div 
            className={`
                flex items-center justify-between cursor-pointer w-full text-[14px] 
                bg-[#131316] hover:bg-[#232328] transition-all duration-300 
                border border-[#232328] px-4 py-2 rounded-[8px]
                ${isActive ? "bg-[#232328] border-blue-500" : ""}
                ${deleteChatMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={handleClick}
        >
            <div className="flex items-center gap-2">
                <span className="text-white truncate">
                    {chat?.title || "Untitled Chat"}
                </span>
            </div>
            
            {chat && (
                <Trash2
                    className="
                        w-[14px] h-[14px]
                        text-white
                        hover:text-red-500
                        hover:scale-125
                        transition-all duration-200
                        flex-shrink-0
                    "
                    onClick={handleDelete}
                />
            )}
        </div>
    );
};