import { FC } from "react"

interface Props{
    isUser: boolean
}

export const Message:FC<Props> = ({isUser}) => {
    return (
        <div className={`flex flex-col gap-5 ${isUser ? 'w-[70%] bg-[#09090B] self-end' : ' w-[85%] bg-[#6B26D9]'} p-4 border border-[#232328] rounded-[15px]`}>
            <div className="flex items-center justify-between">
                <p className="text-[13px] cursor-pointer text-[#8A8A93]">
                    {isUser ? 'You' : 'Gonka AI'}
                </p>
                <p className="text-[12px] cursor-pointer text-[#8A8A93]">
                    {isUser ? 'now' : 'Streaming...'}
                </p>
            </div>
            <p className="text-[15px] text-end cursor-pointer text-[#ffffff]">Type some message</p>
        </div>
    )
}