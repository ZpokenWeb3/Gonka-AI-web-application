import { Check } from "lucide-react"

export const Checklist = () => {
    return (
        <div className="flex flex-col gap-3 bg-[#151518] border border-[#232328] p-4 rounded-[25px]">
            <h4 className="text-[22px] font-semibold text-white">Onboarding checklist</h4>
            <div className="flex flex-col transition-all duration-200 text-[14px] text-white space-y-2">
                {["Connect Wallet", "Add funds", "Send first message", "Try another model"].map((label) => (
                    <label key={label} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="hidden peer" />
                    <span className="w-4 h-4 rounded-full border-2 border-[#6B26D9] flex-shrink-0
                                    flex items-center justify-center
                                    peer-checked:bg-[#6B26D9]
                                    transition-colors duration-200">
                        <Check width={10} height={10}/>
                    </span>
                    <span>{label}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}