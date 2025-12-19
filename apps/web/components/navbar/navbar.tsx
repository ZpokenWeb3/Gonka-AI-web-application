import {Button} from "../ui/button";
import {CircleQuestionMark, KeyRound, Plus} from "lucide-react";
import {ChatList} from "./chat-list";
import {Logo} from "../ui/logo";

;

export const Navbar = () => {
    return (
        <div className="md:flex hidden flex-col w-[320px] bg-[#0f0f0f] border-r border-[#232330]">
            <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                <Logo/>
                <div className="flex flex-col">
                    <h2 className="text-xl text-[#E0E4EB] font-semibold">GONka</h2>
                    <p className="text-xs text-[#a7a7b8]">
                        Decentralized AI access</p>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-4">
                <Button variant="secondary">
                    <Plus width={15} height={15} color="#ffffff"/>
                    New Chat
                </Button>
            </div>
            <ChatList/>
            <div className="flex flex-col gap-3">
                <div className="flex px-2 gap-3">
                    <Button variant="default" className="w-[55%]">
                        <KeyRound width={16} height={16} color="#3F434D"/>
                        Developer API
                    </Button>
                    <Button variant="default" className="w-[40%]">
                        <CircleQuestionMark width={16} height={16} color="#3F434D"/>
                        Help
                    </Button>
                </div>
                <div className="flex items-center p-4 gap-1.5 border-t border-[#232330]">
                    <p className="text-xs text-[#3F434D]">Dark-mode only • v1.0 prototype</p>
                </div>
            </div>
        </div>
    )
}
