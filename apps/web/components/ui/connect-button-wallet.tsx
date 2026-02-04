'use client';

import { useState } from "react";
import { Wallet, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const ConnectButtonWallet = ({ onConnect }: { onConnect?: (address: string) => void }) => {
    const { authState, authError, isAuthenticating, retry, authenticate } = useAuth();

    const [address, setAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const connectLeap = async () => {
        const anyWindow = window as any;
        if (!anyWindow.leap) {
            alert("Please install Leap Wallet");
            return;
        }

        try {
            setIsConnecting(true);
            await anyWindow.leap.enable("gonka-mainnet");
            const offlineSigner = anyWindow.leap.getOfflineSigner("gonka-mainnet");
            const accounts = await offlineSigner.getAccounts();
            const userAddress = accounts[0].address;
            setAddress(userAddress);
            
            // Запускаем flow аутентификации (nonce + verify)
            await authenticate(userAddress);

            // Вызываем колбэк только после успешной аутентификации
            onConnect?.(userAddress);
        } catch (err) {
            console.error("Leap connect error:", err);
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-2">
            <button
                onClick={connectLeap}
                disabled={isConnecting || Boolean(address)}
                className="
          flex items-center gap-2 px-4 py-2 rounded-xl
          bg-[#131316] text-sm text-[#c9c9c9] font-medium
          border border-[#232328] hover:bg-[#232328] transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
            >
                <Wallet size={16} />
                {isAuthenticating
                    ? "Authorizing..."
                    : isConnecting
                        ? "Connecting..."
                        : address
                            ? `${address.slice(0, 6)}...${address.slice(-4)}`
                            : "Connect Leap Wallet"}
            </button>

            {authState === "error" && authError && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/20 border border-red-500/50 max-w-xs">
                    <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                    <span className="text-xs text-red-400 flex-1">{authError}</span>
                    <button
                        onClick={() => address && authenticate(address)}
                        className="text-xs text-red-300 underline hover:text-red-200 whitespace-nowrap"
                    >
                        Retry
                    </button>
                </div>
            )}
        </div>
    );
};
