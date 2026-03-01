import { X } from "lucide-react"
import { FC, ReactNode } from "react"

interface Props{
    form: ReactNode
    isOpen: boolean
    onClose: () => void
}

export const Modal:FC<Props> = ({form, isOpen, onClose}) => {
    if (!isOpen) return null

    return (
        <div className="flex z-[100] items-center justify-center fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="flex flex-col items-center justify-center w-fit bg-[#131316] shadow-2xl shadow-[#1c0246] rounded-[12px] p-5 relative h-fit" onClick={(e) => e.stopPropagation()}>
                <div onClick={onClose} className="self-end text-white text-xl">
                    <X className="cursor-pointer" color="#ffffff"/>
                </div>
                {form}
            </div>
        </div>
    )
}