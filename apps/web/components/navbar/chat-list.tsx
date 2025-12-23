import {MessageSquare} from "lucide-react";
import { ChatBlock } from "./chat-block";

export const ChatList = () => {
    return (
        <div className="flex flex-col flex-1 items-center gap-1">
            {/* <>
                <MessageSquare width={30} height={30} color="#a7a7b8"/>
                <h4 className="text-sm text-[#a7a7b8] mt-2">No chats</h4>
                <p className="text-xs text-[#a7a7b8]">Create a new chat</p>
            </> */}
            <div className="flex flex-col gap-1.5 relative w-full px-4">
                <ChatBlock/>
                <ChatBlock/>
                <ChatBlock/>
                <ChatBlock/>

                {/* <div className="absolute bottom-[-20px] right-0 blur-[10px] w-full h-[220px] bg-[#0f0f0f]"></div> */}
            </div>
        </div>
    )
}