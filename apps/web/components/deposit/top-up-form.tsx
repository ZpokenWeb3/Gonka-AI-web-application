import { ArrowDownToLine, CircleDollarSign, CreditCard, Lightbulb, MoveRight, RefreshCcw, Shuffle } from "lucide-react"
import { Button } from "../ui/button"

export const TopUpForm = () => {
    return (
        <div className="flex flex-col gap-7 w-[500px] bg-[#131316] p-5 rounded-[12px]">
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center gap-3">
                    <CircleDollarSign width={28} height={28} color="#ffffff" />
                    <h2 className="text-[24px] text-white font-semibold">Add funds</h2>
                </div>
                <p className="text-[15px] text-gray-400">Choose how you'd like to add GNK tokens</p>
            </div>
            <div className="flex flex-col gap-2">
                <Button className="flex items-center justify-between h-fit py-3" variant="destructive">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center bg-[#6B26D9] w-10 h-10 rounded-sm">
                            <CreditCard className="w-5 h-5"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <h4 className="text-[16px] text-white font-semibold">Buy with Card</h4>
                            <p className="text-[12px] font-light text-gray-400">Credit/debit card via MoonPay • ~5 min</p>
                        </div>
                    </div>
                   <MoveRight color="#ffffff" />
                </Button>
                <Button className="flex items-center justify-between h-fit py-3" variant="destructive">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center bg-[#6B26D9] w-10 h-10 rounded-sm">
                            <Shuffle color="#c9c9c9"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <h4 className="text-[16px] text-white font-semibold">Bridge from Ethereum</h4>
                            <p className="text-[12px] font-light text-gray-400">Move GNK from ETH mainnet • ~15 min</p>
                        </div>
                    </div>
                   <MoveRight color="#ffffff" />
                </Button>
                <Button className="flex items-center justify-between h-fit py-3" variant="destructive">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center bg-[#6B26D9] w-10 h-10 rounded-sm">
                            <RefreshCcw className="w-5 h-5"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <h4 className="text-[16px] text-white font-semibold">Swap USDC → GNK</h4>
                            <p className="text-[12px] font-light text-gray-400">Via 1inch DEX aggregator</p>
                        </div>
                    </div>
                   <MoveRight color="#ffffff" />
                </Button>

                <Button className="flex items-center justify-between h-fit py-3" variant="destructive">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center bg-[#6B26D9] w-10 h-10 rounded-sm">
                            <ArrowDownToLine className="w-5 h-5"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <h4 className="text-[16px] text-white font-semibold">Direct Deposit</h4>
                            <p className="text-[12px] font-light text-gray-400">Send GNK directly to your address</p>
                        </div>
                    </div>
                   <MoveRight color="#ffffff" />
                </Button>
            </div>
            <div className="flex flex-col gap-3 text-[12px] text-gray-300 border border-[#232328] p-4 rounded-md">
                <div className="flex items-center gap-3">
                    <Lightbulb color="#fcd700" width={20} height={20}/>
                    <h5 className="text-[13px] text-white font-semibold">Recommended first deposit</h5>
                </div>
                $10-20 worth of GNK gives you ~50-100 AI conversations. You only pay for what you use.
            </div>
        </div>
    )
}