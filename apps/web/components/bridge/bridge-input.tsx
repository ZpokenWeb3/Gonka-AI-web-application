import { FC } from "react"

interface Props{
    type: string
    currency: string
    chain: string
    logo: string
}

export const BridgeInput:FC<Props> = ({type, currency, chain, logo}) => {
    return (
        <div className="flex flex-col gap-4 bg-[#232328] p-3 w-full rounded-sm">
            <p className="text-[13px] text-gray-300">{type}</p>
            <div className="flex items-center justify-between gap-10 w-full">
                <div className="flex items-center gap-2">
                    <img src={logo} className="w-[35px] h-[35px] rounded-full border border-white" alt="" />
                    <div className="flex flex-col gap-1">
                        <h5 className="text-[18px] leading-[18px] font-medium text-white">{currency}</h5>
                        <p className="text-[10px] text-gray-400 leading-[12px] font-light">{chain}</p>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="0.0"
                    className="
                        text-[24px] flex-1 text-right text-gray-300 font-semibold bg-transparent outline-none min-w-0"
                />
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[13px] text-gray-300">0 ETH</p>
                <p className="text-[13px] text-gray-300">$0</p>
            </div>
        </div>
    )
}