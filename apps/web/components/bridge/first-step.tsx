import { ArrowLeftRight } from "lucide-react";
import { BridgeInput } from "../../components/bridge/bridge-input";

export const FirstStep = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-2 w-full">
                <BridgeInput type="From" currency="ETH" chain="Ethereum" logo="ethereum.jpg"/>
                <ArrowLeftRight color="#ffffff" className="rotate-90" />
                <BridgeInput type="To" currency="GNK" chain="Cosmo" logo="gnk.png"/>
            </div>
            <div className="flex flex-col w-full gap-0.5">
                <div className="flex items-center justify-between">
                    <p className="text-[13px] text-gray-300">You'll receive:</p>
                    <p className="text-[13px] text-gray-300">~99.50 GNK</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[13px] text-gray-300">Bridge fee:</p>
                    <p className="text-[13px] text-gray-300">0.50 GNK (0.5%)</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[13px] text-gray-300">Estimated gas:</p>
                    <p className="text-[13px] text-gray-300">~$3.50</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[13px] text-gray-300">Time:</p>
                    <p className="text-[13px] text-gray-300">~10-15 minutes </p>
                </div>
            </div>
        </>
    )
}