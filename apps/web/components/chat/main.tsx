import { useChatStore } from "../../store/useChatStore";
import {Button} from "../ui/button";
import { GettingStarted } from "../ui/getting-started";
import { Checklist } from "./checklist";
import { QuickPreview } from "./quick-preview";

export const Main = () => {
    const setActiveChat = useChatStore((state) => state.setActiveChat);

    return (
        <div className="flex p-7 gap-5 h-full">
            <div className="flex flex-col gap-7 w-[700px] h-fit bg-[#151518] border border-[#232328] p-7 rounded-[25px]">
                <div className="text-[#6B26D9] text-[15px] w-fit border border-[#6B26D9] font-medium py-1.5 px-3 rounded-full">Welcome to Gonka AI</div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-[44px] leading-[44px] w-[500px] text-white font-bold">Access powerful AI models through the decentralized
                        Gonka network.</h2>
                    <p className="text-[15px] leading-5 w-[500px] text-[#8A8A93]">No email. Pay only for what you use. Chats encrypted. Built for builders and humans.</p>
                </div>
                <div className="flex flex-wrap w-[430px] gap-3">
                    <Button className="w-fit" variant="outline">No password needed</Button>
                    <Button className="w-fit" variant="outline">Transparent usage + costs
                    </Button>
                    <Button className="w-fit" variant="outline">Wallet as identity</Button>
                </div>
                <div className="flex items-center gap-3 w-[200px]">
                    <Button onClick={() => setActiveChat(true)} variant="secondary">Get Started</Button>
                    <Button variant="outline">Connect Wallet</Button>
                </div>
                <p className="text-[13px] cursor-pointer underline text-[#8A8A93]">What's a wallet</p>
            </div>
            <div className="flex flex-col w-[500px] gap-5">
                <QuickPreview/>
                <Checklist/>
            </div>

            <GettingStarted/>
        </div>
    )
}