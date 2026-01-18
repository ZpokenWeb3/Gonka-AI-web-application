import { MessageSquare } from "lucide-react"

export const TransactinBlock = () => {
    return (
        <div className="flex items-center justify-between cursor-pointer bg-[#09090B] p-4 border-b border-[#232328] first:rounded-t-[15px] last:rounded-b-[15px] last:border-b-0">
            <div className="flex gap-4 items-center">
                <MessageSquare color="#ffffff"/>
                <div className="flex flex-col gap-1">
                    <h6 className="text-[14px] leading-[15px] text-white">Chat: ZK proof explanation</h6>
                    <p className="text-[12px] text-[#707070]">GPT-4 • 2,341 tokens • 2:34 PM</p>
                </div>
            </div>
            <h5 className="text-sm font-semibold text-[#c9c9c9]">-0.15 GNK</h5>
        </div>
    )
}