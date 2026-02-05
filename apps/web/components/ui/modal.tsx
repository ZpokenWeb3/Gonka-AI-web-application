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
            <div className="flex items-center justify-center w-full px-5 relative h-full" onClick={(e) => e.stopPropagation()}>
                {form}
            </div>
        </div>
    )
}