import Image from "next/image"
import { FC } from "react"

interface Props{
    logo: string
    title: string
    modelValue: "QWEN25" | "QWEN323" | "QWEN332" | "QWENQWQ" | "REDHAT"
    onSelect?: (model: "QWEN25" | "QWEN323" | "QWEN332" | "QWENQWQ" | "REDHAT") => void
    disabled?: boolean
}

export const ModelItem:FC<Props> = ({logo, title, modelValue, onSelect, disabled = false}) => {
    return (
        <div 
            className={`flex items-center gap-4 p-2 rounded-[7px] cursor-pointer duration-200 transition-all ${
                disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#232328]'
            }`}
            onClick={() => !disabled && onSelect?.(modelValue)}
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-white">
                <Image width={30} height={30} src={logo} alt="logo"/>
            </div>
            <h5 className="text-[15px] text-white">{title}</h5>
        </div>
    )
}