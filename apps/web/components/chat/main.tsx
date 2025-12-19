import {Button} from "../ui/button";

export const Main = () => {
    return (
        <div className="flex p-7 gap-10 h-full">
            <div className="flex flex-col gap-7 w-[700px] bg-[#151518] border border-[#232328] p-7 rounded-[25px]">
                <div className="text-[#6B26D9] text-[15px] w-fit border border-[#6B26D9] font-medium py-1.5 px-3 rounded-full">Welcome to Gonka AI</div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-[44px] leading-[44px] w-[500px] text-white font-bold">Access powerful AI models through the decentralized
                        Gonka network.</h2>
                    <p className="text-[15px] leading-5 w-[500px] text-[#8A8A93]">No email. Pay only for what you use. Chats encrypted. Built for builders and humans.</p>
                </div>
                <div className="flex flex-wrap w-[400px] gap-3">
                    <Button variant="outline">No password needed</Button>
                    <Button variant="outline">Transparent usage + costs
                    </Button>
                    <Button variant="outline">Wallet as identity</Button>
                </div>
                <div className="flex items-center gap-3 w-[200px]">
                    <Button variant="secondary">Get Started</Button>
                    <Button variant="outline">Connect Wallet</Button>
                </div>
                <p className="text-[13px] cursor-pointer underline text-[#8A8A93]">What's a wallet</p>
            </div>
        </div>
    )
}