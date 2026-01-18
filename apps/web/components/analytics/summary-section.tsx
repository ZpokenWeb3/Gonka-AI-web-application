import { SummaryBlock } from "./summary-block"

export const SummarySection = () => {
    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg border border-[#232328]">
            <h3 className="text-lg text-white">Summary</h3>
            <div className="flex items-center gap-2">
                <SummaryBlock number={1231} title="Requests" percent={8}/>
                <SummaryBlock number={523456} title="Tokens" percent={12}/>
                <SummaryBlock number={15.67} title="Cost" percent={10}/>
            </div>
        </div>
    )
}