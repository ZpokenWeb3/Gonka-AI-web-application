import { SectionTitle } from "../ui/section-title"

export const UsageStatistic = () => {
    return (
        <div className="flex flex-col gap-3">
            <SectionTitle text="Usage Statistic"/>
            <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2 items-center justify-center w-full bg-[#1a1a1d] p-4 rounded-md border border-[#232328]">
                    <h4 className="text-3xl leading-[32px] font-bold text-white ">47</h4>
                    <h5 className="text-md text-white">Total Chats</h5>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center w-full bg-[#1a1a1d] p-4 rounded-md border border-[#232328]">
                    <h4 className="text-3xl leading-[32px] font-bold text-white ">1.2M</h4>
                    <h5 className="text-md text-white">Tokens Used</h5>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center w-full bg-[#1a1a1d] p-4 rounded-md border border-[#232328]">
                    <h4 className="text-3xl leading-[32px] font-bold text-white ">5</h4>
                    <h5 className="text-md text-gray-400">Agents Used</h5>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center w-full bg-[#1a1a1d] p-4 rounded-md border border-[#232328]">
                    <h4 className="text-3xl leading-[32px] font-bold text-white ">14d</h4>
                    <h5 className="text-md text-white">Member Since</h5>
                </div>
            </div>
        </div>
    )
}