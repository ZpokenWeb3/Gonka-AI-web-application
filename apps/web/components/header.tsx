import {ConnectButtonWallet} from "./ui/connect-button-wallet";
import {Button} from "./ui/button";
import {Search, Settings} from "lucide-react";


export const Header = () => {
    return (
        <div className="flex items-center justify-between w-full border-b border-[#232330] p-4">
            <div
                className="flex items-center justify-center h-[36px] gap-2 px-2 text-sm text-[#c9c9c9] font-medium cursor-pointer w-[150px] bg-[#131316] transition-all duration-300 border border-[#232328] rounded-[8px]">
                <Search width={15} height={15}/>
                <input
                    placeholder="Search "
                    className="w-full text-sm text-white outline-none bg-transparent"
                />
            </div>
            <div className="flex gap-2">
                <ConnectButtonWallet/>
                <Button className="w-10 h-10" variant="outline">
                    <Settings width={30} height={30}/>
                </Button>
            </div>
        </div>
    )
}