import { Hourglass, Info } from "lucide-react"

export const ThirdStep = () => {
    return (
        <div className="flex flex-col items-start w-full gap-4">
            <p className="text-[13px] text-gray-300">Confirm bridge transaction </p>
            <div className="flex flex-col w-full gap-3.5 p-3 bg-[#232328] rounded-sm">
                <div className="text-[14px] text-gray-300 pb-2 border-b border-white">Summary</div>
                <div className="flex flex-col w-full gap-0.5">
                    <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-300">Sending:</p>
                        <p className="text-[13px] text-gray-300">100.00 GNK</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-300">From:</p>
                        <p className="text-[13px] text-gray-300">Ethereum (0x1a2b...3c4d)</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-300">To:</p>
                        <p className="text-[13px] text-gray-300">Gonka (gonka1xyz...789)</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-300">You'll receive:</p>
                        <p className="text-[13px] text-gray-300">~99.50 GNK</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-300">Gas cost:</p>
                        <p className="text-[13px] text-gray-300">~$2.00</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <Hourglass width={17} height={17} color="#ffffff"/>
                <p className="text-[13px] text-gray-300">Confirm in your wallet... </p>
            </div>
        </div>
    )
}