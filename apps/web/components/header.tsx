import {ConnectButtonWallet} from "./ui/connect-button-wallet";
import {Logo} from "./ui/logo";
import {Button} from "./ui/button";
import {Search, Settings} from "lucide-react";


export const Header = () => {
    return (
        <div className="flex items-center justify-between w-full border-b border-[#232330] p-4">
            <div className="flex items-center gap-3">
                <Logo/>
                <div className="flex flex-col">
                    <h2 className="text-xl text-[#E0E4EB] font-semibold">GONka</h2>
                    <p className="text-xs text-[#a7a7b8]">
                        Decentralized AI access</p>
                </div>
            </div>
            <div className="flex gap-2">
                <div
                    className="flex items-center justify-center gap-2 px-2 text-sm text-[#6a1bbf] font-medium cursor-pointer w-[150px] bg-[#090211] transition-all duration-300 border border-[#6a1bbf] rounded-[8px]">
                    <Search width={15} height={15}/>
                    <input
                        placeholder="Search "
                        className="w-full text-sm text-white outline-none bg-transparent"
                    />
                </div>
                <ConnectButtonWallet/>
                <Button className="w-10 h-10" variant="outline">
                    <Settings width={30} height={30}/>
                </Button>
            </div>
        </div>
    )
}