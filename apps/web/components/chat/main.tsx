import { useAccount } from "wagmi";
import {Button} from "../ui/button";
import { GettingStarted } from "../ui/getting-started";
import { Checklist } from "./checklist";
import { QuickPreview } from "./quick-preview";
import { useRouter } from "next/navigation";

export const Main = () => {
    const router = useRouter();
    const {address} = useAccount();

    return (
        <div className="flex md:p-7 p-5 gap-5 h-full w-full">
            <div className="flex flex-col 2xl:gap-7 gap-5 2xl:w-[700px] xl:w-[500px] w-full h-fit bg-[#151518] border border-[#232328] p-7 2xl:rounded-[25px] rounded-[18px]">
                <div className="text-[#6B26D9] text-[15px] w-fit border border-[#6B26D9] font-medium py-1.5 px-3 rounded-full">Welcome to Gonka AI</div>
                <div className="flex flex-col gap-2">
                    <h2 className="2xl:text-[44px] text-[32px] 2xl:leading-[44px] leading-[34px] 2xl:w-[500px] md:w-[380px] text-white font-bold">Access powerful AI models through the decentralized
                        Gonka network.</h2>
                    <p className="2xl:text-[15px] md:text-[14px] text-[12px] leading-5 2xl:w-[500px] md:w-[380px] text-[#8A8A93]">No email. Pay only for what you use. Chats encrypted. Built for builders and humans.</p>
                </div>
                <div className="flex flex-wrap md:w-[430px] w-full gap-3">
                    <Button className="w-fit" variant="outline">No password needed</Button>
                    <Button className="w-fit" variant="outline">Transparent usage + costs</Button>
                    <Button className="w-fit" variant="outline">Wallet as identity</Button>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-3 md:w-[200px] w-full">
                    <Button onClick={() => router.push('/chat')} variant="secondary">Get Started</Button>
                    {!address && <Button variant="outline">Connect Wallet</Button>}
                </div>
                <p className="text-[13px] cursor-pointer underline text-[#8A8A93]">What's a wallet</p>
            </div>
            <div className="xl:flex hidden flex-col 2xl:w-[500px] w-[420px] 2xl:gap-5 gap-3.5">
                <QuickPreview/>
                <Checklist/>
            </div>

            <GettingStarted/>

        </div>
    )
}