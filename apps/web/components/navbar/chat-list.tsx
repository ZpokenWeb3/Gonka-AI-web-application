import {MessageSquare} from "lucide-react";

export const ChatList = () => {
    return (
        <div className="flex flex-col flex-1 items-center gap-1 p-10">
            <MessageSquare width={30} height={30} color="#a7a7b8"/>
            <h4 className="text-sm text-[#a7a7b8] mt-2">No chats</h4>
            <p className="text-xs text-[#a7a7b8]">Create a new chat</p>
        </div>
    )
}