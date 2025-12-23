import { Brain, HatGlasses, Zap } from "lucide-react"
import { AiType } from "./ai-type"
import { Message } from "./message"

const AIDATA = [
    {
        logo: <Zap color="#ffffff" width={15} height={15}/>,
        title: 'Fast'
    },
    {
        logo: <Brain color="#ffffff" width={15} height={15}/>,
        title: 'Smart'
    },
    {
        logo: <HatGlasses color="#ffffff" width={15} height={15}/>,
        title: 'Private'
    },
]

export const QuickPreview = () => {
    return (
        <div className="flex flex-col gap-4 bg-[#151518] border border-[#232328] p-4 rounded-[25px]">
            <h4 className="text-[22px] font-semibold text-white">Quick Preview</h4>
            <div className="flex items-center gap-2">
                {AIDATA.map((item, index) => (
                    <AiType key={index} logo={item.logo} title={item.title}/>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <Message isUser={false}/>
                <Message isUser={true}/>
            </div>
            <p className="text-[15px] cursor-pointer text-[#8A8A93]">Tip: Press to search chats</p>
        </div>
    )
}