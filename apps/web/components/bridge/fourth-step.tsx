import { Check, Hourglass, Shuffle } from "lucide-react"

export const FourthStep = () => {
    return (
        <div className="flex flex-col items-start w-full gap-4">
            <div className="flex items-center justify-center w-full gap-1.5">
                <Shuffle width={17} height={17} color="#ffffff"/>
                <p className="text-[13px] text-gray-300">Bridging in progress... </p>
            </div>
            <div className="flex flex-col w-full gap-3.5 p-3 bg-[#232328] rounded-sm">
                <div className="flex flex-col w-full gap-0.5">
                    <div className="flex items-center gap-2.5">
                        <Check width={14} height={14} color="#00ff4c"/>
                        <p className="text-[13px] text-gray-300">Transaction submitted </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Check width={14} height={14} color="#00ff4c"/>
                        <p className="text-[13px] text-gray-300">Confirmed on Ethereum (12/12 blocks)</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Hourglass width={14} height={14} color="#ffffff"/>
                        <p className="text-[13px] text-gray-300">Confirm in your wallet... </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full border border-white"></div>
                        <p className="text-[13px] text-gray-300">Confirm in your wallet... </p>
                    </div>
                </div>
            </div>
            <p className="text-[13px] text-gray-300">ETH tx: 0x1a2b...3c4d <span className="cursor-pointer text-blue-400 underline">[View on Etherscan ↗]</span></p>
            <div className="pt-4 border-t border-white text-[13px] text-gray-300">You can close this window. We'll notify you when the bridge is complete. </div>
        </div>
    )
}