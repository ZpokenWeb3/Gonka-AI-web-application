import { KeyRound } from "lucide-react"
import { Button } from "../ui/button"

export const APIBlock = () => {
    return (
        <div className="flex flex-col gap-3 w-full p-5 rounded-[15px] border border-[#232328]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <KeyRound width={18} height={18} color="#ffffff"/>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[18px] leading-4.5 text-white font-semibold">Production Key</h2>
                        <p className="text-[11px] text-[#707070]">gnk_prod_abc123def456...</p>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-[#6B26D9] text-[11px] text-[#c8bade] font-semibold px-2.5 py-0.5 rounded-full">ACTIVE</div>
            </div>
            <div className="flex items-center gap-5">
                <p className="text-[11px] text-[#707070]">Created: Nov 15, 2025</p>
                <p className="text-[11px] text-[#707070]">Last used: 2 hours ago</p>
                <p className="text-[11px] text-[#707070]">Rate: 60 req/min</p>
            </div>
            <div className="flex items-center gap-2">
                <Button className="w-[60px] h-[26px] text-[12px]" variant="outline">View</Button>
                <Button className="w-[54px] h-[26px] text-[12px]" variant="outline">Edit</Button>
                <Button className="w-[65px] h-[26px] text-[#d94149] text-[12px]" variant="outline">Revoke</Button>
            </div>
        </div>
    )
}