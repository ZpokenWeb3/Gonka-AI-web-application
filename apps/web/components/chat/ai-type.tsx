import { Zap } from "lucide-react"
import { FC, ReactNode } from "react"

interface Props{
    logo: ReactNode
    title: string
}

export const AiType:FC<Props> = ({logo, title}) => {
    return (
        <div className="flex items-center gap-2 w-fit cursor-pointer bg-[#151518] border border-[#232328] px-2 py-1 rounded-full">
            {logo}
            <h5 className="text-[14px] font-semibold text-white">{title}</h5>
        </div>
    )
}