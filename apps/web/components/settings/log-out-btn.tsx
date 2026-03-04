import {LogOut} from "lucide-react";
import {useAuth} from "../../hooks/useAuth";
import {useGonka} from "../../providers/gonka-provider";
import {showCustomToast} from "../ui/custom-toast";

export const LogOutBtn = () => {
    const { logout } = useAuth();
    const { setAddress } = useGonka();

    const handleDisconnectWallet = () => {
        logout();
        setAddress(null);
        showCustomToast("success", "Wallet disconnected");
    };

    return (
        <button
            onClick={handleDisconnectWallet}
            className="flex items-center justify-center gap-2 h-[40px] w-fit px-5 rounded-sm text-red-500 cursor-pointer border-red-500 border-[1px]">
            Disconnect Wallet
            <LogOut width={20} height={20}/>
        </button>
    )
}