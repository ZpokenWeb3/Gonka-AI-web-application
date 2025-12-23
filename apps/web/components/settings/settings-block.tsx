import { Bot, MoveRight } from "lucide-react"
import { FC, ReactNode } from "react"

interface Props{
    logo: ReactNode;
    title: string
    text?: string
}

export const SettingsBlock:FC<Props> = ({logo, title, text}) => {
    return (
        <div className="flex items-center justify-between cursor-pointer bg-[#09090B] hover:bg-[#18181c] p-4 border-b border-[#232328] transition-all duration-300 first:rounded-t-[15px] last:rounded-b-[15px] last:border-b-0">
            <div className="flex gap-3 items-center">
                {logo}
                <div className="flex flex-col">
                    <h6 className="text-[14px] leading-[15px] text-white">{title}</h6>
                    <p className="text-[12px] text-[#707070]">{text}</p>
                </div>
            </div>
            <MoveRight width={15} height={15} color="#ffffff"/>
        </div>
    )
}
