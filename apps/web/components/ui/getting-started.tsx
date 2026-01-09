'use client'

import { ChevronUp } from "lucide-react"
import { useState } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useCreateChat } from "../../hooks/useChats"
import { ChecklistItem } from "../chat/checklist-item"

export const GettingStarted = () => {
    const [isOpen, setOpen] = useState(true)

    const { isConnected } = useAccount();
    
    const walletConnected = isConnected;
    const hasFunds = false; 
    const sentFirstMessage = false; 
    const triedAnotherModel = false;

    return (
        <div className="absolute right-[25px] bottom-[25px] flex flex-col gap-5 w-[280px] text-[14px] text-white cursor-pointer transition-all duration-200 bg-[#09090B] border border-[#232328] p-2 rounded-[15px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <div className={`w-1 h-1 ${walletConnected ? 'bg-[#6B26D9]' : 'bg-[#b3b3b3]'} rounded-full`}/>
                    <div className="w-1 h-1 bg-[#b3b3b3] rounded-full"/>
                    <div className="w-1 h-1 bg-[#b3b3b3] rounded-full"/>
                    <div className="w-1 h-1 bg-[#b3b3b3] rounded-full"/>
                </div>
                Getting Started
                <ChevronUp 
                    className={`${isOpen ? 'rotate-180' : ''} transition-all duration-200`}
                    width={17}
                    height={17}
                    color="#ffffff"/>
            </div>
            {isOpen && (
                <div className="flex flex-col space-y-2 2xl:text-[14px] text-[13px]">
                    <ChecklistItem active={walletConnected} label="Connect Wallet" />
                    <ChecklistItem active={hasFunds} label="Add funds" />
                    <ChecklistItem active={sentFirstMessage} label="Send first message" />
                    <ChecklistItem active={triedAnotherModel} label="Try another model" />
                </div>
            )}
        </div>
    )
}