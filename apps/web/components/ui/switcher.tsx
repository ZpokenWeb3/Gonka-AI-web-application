import { FC } from "react"

interface SwitcherProps {
    checked: boolean
    onChange: () => void
}

export const Switcher: FC<SwitcherProps> = ({ checked, onChange }) => {
    return (
        <button
            onClick={onChange}
            className={`relative w-[44px] h-[24px] cursor-pointer rounded-full transition-colors duration-300
                ${checked ? "bg-[#6B26D9]" : "bg-[#2A2A2E]"}`}
        >
            <span
                className={`absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform duration-300
                    ${checked ? "translate-x-[20px]" : "translate-x-0"}`}
            />
        </button>
    )
}
