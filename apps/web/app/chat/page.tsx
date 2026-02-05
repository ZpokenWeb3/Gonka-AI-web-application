'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateChat, useChats } from "../../hooks/useChats";
import { useModelSelection } from "../../hooks/useModelSelection";
import { ModelForm } from "../../components/chat/model-form";
import { Modal } from "../../components/ui/modal";


export default function ChatPage() {
    const router = useRouter();
    const createChatMutation = useCreateChat();
    const { data: chatsData } = useChats();
    const { showModelModal, loading, selectModel } = useModelSelection();
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (!showModelModal && !isCreating && chatsData?.data) {
            if (chatsData.data.length > 0) {
                const mostRecentChat = chatsData.data.sort((a, b) => 
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                )[0];
                if (mostRecentChat) {
                    router.push(`/chat/${mostRecentChat.id}`);
                }
            } else {
                setIsCreating(true);
                createChatMutation.mutate(undefined, {
                    onSuccess: (response) => {
                        router.push(`/chat/${response.data.id}`);
                    },
                    onError: () => {
                        setIsCreating(false);
                    }
                });
            }
        }
    }, [showModelModal, isCreating, chatsData, createChatMutation, router]);

    return (
        <div className={`flex flex-col items-center justify-center w-full h-full`}>
            {showModelModal && (
                <Modal 
                    isOpen={showModelModal}
                    onClose={() => {}}
                    form={<ModelForm onSelect={selectModel} disabled={loading} />}
                />
            )}
            {!showModelModal && !chatsData?.data && (
                <div className="text-white">Loading...</div>
            )}
        </div>
    )
}