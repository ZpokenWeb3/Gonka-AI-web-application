import { Hourglass, Info } from "lucide-react"

export const SecondStep = () => {
    return (
        <div className="flex flex-col items-start w-full gap-4">
            <p className="text-[13px] text-gray-300">Approve GNK token for bridging </p>
            <div className="flex flex-col gap-3.5 p-3 bg-[#232328] rounded-sm">
                <div className="flex items-center gap-1.5">
                    <Info width={17} height={17} color="#ffffff"/>
                    <p className="text-[13px] text-gray-300">This is a one-time approval</p>
                </div>
                <p className="text-[13px] text-gray-300">Your wallet will ask you to approve the bridge contract to transfer GNK tokens. This only needs to be done once.</p>
                <p className="text-[13px] text-gray-300">Gas estimate: ~$1.50 </p>
            </div>
            <div className="flex items-center gap-1.5">
                <Hourglass width={17} height={17} color="#ffffff"/>
                <p className="text-[13px] text-gray-300">Waiting for approval in wallet...</p>
            </div>
        </div>
    )
}