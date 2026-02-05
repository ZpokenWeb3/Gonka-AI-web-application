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
        <div className="flex flex-col 2xl:gap-4 gap-3 bg-[#151518] border border-[#232328] 2xl:p-4 p-3 2xl:rounded-[25px] rounded-[18px]">
            <h4 className="2xl:text-[22px] text-[21px] font-semibold text-white">Quick Preview</h4>
            <div className="flex items-center gap-2">
                {AIDATA.map((item, index) => (
                    <AiType key={index} logo={item.logo} title={item.title}/>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <Message isUser={false}/>
                <Message isUser={true}/>
            </div>
            <p className="2xl:text-[15px] text-[13px] cursor-pointer text-[#8A8A93]">Tip: Press to search chats</p>
        </div>
    )
}