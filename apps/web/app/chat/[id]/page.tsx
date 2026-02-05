'use client'

import {ChatWrapper} from "../../../components/chat/chat-wrapper";
import { ModelForm } from "../../../components/chat/model-form";
import { Modal } from "../../../components/ui/modal";
import { useModelSelection } from "../../../hooks/useModelSelection";
import { useParams } from "next/navigation";

export default function ChatPage() {
    const params = useParams();
    const chatId = params.id as string;
    const { showModelModal, loading, selectModel } = useModelSelection();

    return (
        <div className={`flex flex-col items-center w-full h-full`}>
            <ChatWrapper chatId={chatId}/>
            {showModelModal && (
                <Modal 
                    isOpen={showModelModal}
                    onClose={() => {}}
                    form={<ModelForm onSelect={selectModel} disabled={loading} />}
                />
            )}
        </div>
    )
}
