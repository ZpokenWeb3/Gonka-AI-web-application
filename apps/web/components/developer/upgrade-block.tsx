import { TrendingUp } from "lucide-react"
import { FC } from "react";

interface Props{
    title: string;
    name: string;
    percent: number;
}

export const UpgradeBlock:FC<Props> = ({title, name, percent}) => {
    return (
        <div className="flex flex-col gap-1 w-full md:p-5 p-3 md:rounded-[15px] rounded-[8px] border border-[#232328]">
            <h3 className="text-[34px] text-white font-bold">{title}</h3>
            <h5 className="text-[14px] text-[#707070]">{name}</h5>
            <div className="flex items-center gap-1">
                <TrendingUp width={15} height={15} color="#0aff54" />
                <p className="text-[12px] text-[#0aff54]">{percent}%</p>
            </div>
        </div>
    )
}