import { Check } from "lucide-react";
import { FC } from "react";

interface Props{
    active: boolean;
    label: string
}

export const ChecklistItem:FC<Props> = ({active, label}) => {
    return (
    <label className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded-full border-2 border-[#6B26D9] flex items-center justify-center
        ${active ? "bg-[#6B26D9]" : ""}`}
      >
        {active && <Check size={10} className="text-white" />}
      </div>
      <span className={active ? "text-white" : "text-white/60"}>
        {label}
      </span>
    </label>
    )
}
