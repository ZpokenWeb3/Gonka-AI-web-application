import {Bot, Send, User} from "lucide-react";
import {Button} from "../ui/button";

export const ChatTuringForm = () => {
    return (
        <div className="flex flex-col w-[900px] h-[700px] bg-[#151518] rounded-md">
            <div className="text-[20px] text-white font-semibold py-5 px-10">TURING TWIST</div>
            <div className="flex-1"></div>
            <div className="flex items-center w-full gap-7 py-10 px-10">
                <div className="flex items-center w-full gap-2">
                    <Button className="w-fit h-full" variant="destructive">
                        <Bot color="#ffffff"/>
                        AI
                    </Button>
                    <Button className="w-fit h-full" variant="destructive">
                        <User color="#ffffff"/>
                        Human
                    </Button>
                    <input
                        placeholder="Enter your message"
                        className="flex-1 text-sm text-white outline-none px-3 py-2.5 bg-[#232328] rounded-sm"
                    />

                    <button
                        className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-[8px] bg-[#6B26D9] disabled:opacity-50 transition-all duration-300"
                    >
                        <Send width={15} height={15} color="#fff"/>
                    </button>
                </div>
            </div>
        </div>
    )
}