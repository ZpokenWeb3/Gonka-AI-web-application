import React, { useEffect, useRef, useState } from "react";
import {Trash2, MessageSquare, Pin, Pencil} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useChangeChat, useDeleteChat } from "../../hooks/useChats";

interface ChatBlockProps {
    chat?: {
        id: string;
        title: string;
        createdAt: string;
        isPinned: boolean;
    };
}

export const ChatBlock = ({ chat }: ChatBlockProps) => {
    const router = useRouter();
    const params = useParams();
    const deleteChatMutation = useDeleteChat();
    const changeChatMutation = useChangeChat();
    const currentChatId = params.id as string;
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [localTitle, setLocalTitle] = useState(chat?.title ?? "");
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setLocalTitle(chat?.title ?? "");
    }, [chat?.title]);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);

    const handleClick = () => {
        if (!chat || isEditingTitle) return;
        router.push(`/chat/${chat.id}`);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (chat) {
            deleteChatMutation.mutate(chat.id);
        }
    };

    const handleTogglePin = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!chat) return;

        changeChatMutation.mutate({
            id: chat.id,
            isPinned: !chat.isPinned,
            title: chat.title,
        });
    };

    const handleRename = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!chat) return;

        setIsEditingTitle(true);
    };

    const finishRename = () => {
        if (!chat) {
            setIsEditingTitle(false);
            return;
        }

        const trimmed = localTitle.trim();

        if (!trimmed || trimmed === chat.title) {
            setLocalTitle(chat.title);
            setIsEditingTitle(false);
            return;
        }

        changeChatMutation.mutate(
            {
                id: chat.id,
                isPinned: chat.isPinned,
                title: trimmed,
            },
            {
                onSuccess: () => {
                    setIsEditingTitle(false);
                },
                onError: () => {
                    setLocalTitle(chat.title);
                    setIsEditingTitle(false);
                },
            }
        );
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
            <div className="flex items-center w-[100px] gap-2">
                {isEditingTitle ? (
                    <input
                        ref={titleInputRef}
                        className="bg-transparent border-b border-[#444] text-white text-[14px] outline-none focus:border-[#6B26D9] truncate"
                        value={localTitle}
                        maxLength={20}
                        onChange={(e) => setLocalTitle(e.target.value.slice(0, 20))}
                        onBlur={finishRename}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                finishRename();
                            } else if (e.key === "Escape") {
                                e.preventDefault();
                                setLocalTitle(chat?.title ?? "");
                                setIsEditingTitle(false);
                            }
                        }}
                    />
                ) : (
                    <span
                        className="text-white truncate"
                    >
                        {chat?.title || "Untitled Chat"}
                    </span>
                )}
            </div>
            
            <div className="flex items-center gap-1">
                {chat && (
                    <Pencil
                        className={`
                        w-[14px] h-[14px]
                        text-white
                        hover:text-[#6B26D9]
                        hover:scale-125
                        transition-all duration-200
                        flex-shrink-0
                    `}
                        onClick={handleRename}
                    />
                )}
                {chat && (
                    <Pin
                        className={`
                        w-[14px] h-[14px]
                        ${chat.isPinned ? "text-[#6B26D9]" : "text-white"}
                        hover:text-[#6B26D9]
                        hover:scale-125
                        transition-all duration-200
                        flex-shrink-0
                    `}
                        onClick={handleTogglePin}
                    />
                )}
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
        </div>
    );
};