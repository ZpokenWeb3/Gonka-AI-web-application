import { MoveUp } from "lucide-react"
import { FC } from "react"

interface Props{
    number: number
    title: string
    percent: number
}

export const SummaryBlock:FC<Props> = ({number, title, percent}) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center w-full bg-[#1a1a1d] p-4 rounded-md border border-[#232328]">
            <h4 className="text-2xl leading-[24px] font-bold text-white ">{number}</h4>
            <h5 className="text-md text-white">{title}</h5>
            <div className="flex items-center gap-1">
                <MoveUp width={13} height={13} color="#05df72"/>
                <span className="text-green-400">{percent}%</span>
            </div>
        </div>
    )
}