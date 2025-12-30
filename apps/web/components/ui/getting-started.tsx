'use client'

import {  Check, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

export const GettingStarted = () => {
    const [isOpen, setOpen] = useState(true)
    const { isAuthenticating } = useAuth();

    return (
        <div className="absolute right-[25px] bottom-[25px] flex flex-col gap-5 w-[280px] text-[14px] text-white cursor-pointer transition-all duration-200 bg-[#09090B] border border-[#232328] p-2 rounded-[15px]">
            <div onClick={() => setOpen(!isOpen)} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-[#b3b3b3] rounded-full"/>
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
                <div className="flex flex-col transition-all duration-200 space-y-3">
                    {["Connect Wallet", "Add funds", "Send first message", "Try another model"].map((label) => (
                        <label key={label} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="hidden peer" />
                        <span className="w-4 h-4 rounded-full border-2 border-[#6B26D9] flex-shrink-0
                                        flex items-center justify-center
                                        peer-checked:bg-[#6B26D9]
                                        transition-colors duration-200">
                            {/* <Check width={10} height={10}/> */}
                        </span>
                        <span>{label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}