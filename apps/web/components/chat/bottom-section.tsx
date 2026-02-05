import {Lock} from "lucide-react";
import {Input} from "./input";

interface BottomSectionProps {
    chatId?: string;
}

export const BottomSection  = ({ chatId }: BottomSectionProps) => {
    return (
        <div className="flex flex-col items-center h-fit gap-1 w-full border-t border-[#21232C] p-5">
            <Input chatId={chatId}/>
            <div className="flex items-center gap-1">
                <Lock width={13} height={13} color="#73798C" />
                <p className="text-xs text-[#73798C]">Messages are encrypted and stored locally</p>
            </div>
        </div>
    )
}