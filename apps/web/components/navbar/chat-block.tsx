import { Trash2 } from "lucide-react"

export const ChatBlock = () => {
    return (
        <div className="flex items-center justify-between cursor-pointer w-full text-[14px] text-white bg-[#131316] hover:bg-[#232328] transition-all duration-300 border border-[#232328] px-4 py-2 rounded-[8px]">
            New Chat
            <Trash2 width={14} height={14} color="#ffffff" />
        </div>
    )
}