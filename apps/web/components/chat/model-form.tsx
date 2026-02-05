import { Brain } from "lucide-react"
import { ModelItem } from "./model-item"

const data = [
    {
        logo: '/qwen-ai.svg',
        title: 'QWEN25' as const,
        displayName: 'Qwen/Qwen2.5-7B-Instruct'
    },
    {
        logo: '/qwen-ai.svg',
        title: 'QWEN323' as const,
        displayName: 'Qwen/Qwen3-235B-A22B-Instruct-2507-FP8'
    },
    {
        logo: '/qwen-ai.svg',
        title: 'QWEN332' as const,
        displayName: 'Qwen/Qwen3-32B-FP8'
    },
    {
        logo: '/qwen-ai.svg',
        title: 'QWENQWQ' as const,
        displayName: 'Qwen/QwQ-32B'
    },
    {
        logo: '/red-hat-ai.png',
        title: 'REDHAT' as const,
        displayName: 'RedHatAI/Qwen2.5-7B-Instruct-quantized'
    }
]

interface Props {
    onSelect: (model: typeof data[number]['title']) => void
    disabled?: boolean
}

export const ModelForm = ({ onSelect, disabled = false }: Props) => {
    return (
        <div className="flex flex-col gap-10 w-[500px] h-[550px] bg-[#131316] shadow-2xl shadow-[#1c0246] p-6 rounded-[12px]">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3.5">
                    <Brain width={30} height={30} color="#ffffff"/>
                    <h3 className="text-[25px] font-semibold text-white">Choose Your AI Model</h3>
                </div>
                <p className="text-[14px] font-light text-[#c9c9c9]">Select the AI model you want to interact with. Different models may provide different levels of creativity, speed, and expertise.</p>
            </div>
            <div className="flex flex-col gap-3">
                {data.map((item, index) => (
                    <ModelItem 
                        key={index} 
                        logo={item.logo} 
                        title={item.displayName}
                        modelValue={item.title}
                        onSelect={onSelect}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    )
}