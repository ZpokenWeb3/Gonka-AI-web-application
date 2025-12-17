'use client';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const ConnectButtonWallet = () => {
  const { authState, authError, isAuthenticating, retry } = useAuth();

  return (
      <div className="flex flex-col items-end gap-2">
        <ConnectButton.Custom>
          {({ openConnectModal, openAccountModal, account, chain, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            if (!connected) {
              return (
                  <button
                      onClick={openConnectModal}
                      className="
                  flex items-center cursor-pointer gap-2
                  px-4 py-2
                  rounded-xl
                  bg-[#090211]
                  text-sm text-[#6a1bbf] font-medium
                  border border-[#6a1bbf]
                  hover:bg-[#0f0719]
                  transition-colors duration-200
                "
                  >
                    <Wallet size={16} />
                    Connect Wallet
                  </button>
              );
            }

            return (
                <button
                    onClick={openAccountModal}
                    disabled={isAuthenticating}
                    className="
                flex items-center cursor-pointer gap-2
                px-4 py-2
                rounded-xl
                bg-[#090211]
                text-sm text-[#6a1bbf] font-medium
                border border-[#6a1bbf]
                hover:bg-[#0f0719]
                transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                >
                  <Wallet size={16} />
                  {isAuthenticating ? (
                      <span className="flex items-center gap-2">
                  Authorizing...
                  <span className="inline-block w-3 h-3 border-2 border-[#6a1bbf] border-t-transparent rounded-full animate-spin" />
                </span>
                  ) : (
                      account?.displayName ?? "Account"
                  )}
                </button>
            );
          }}
        </ConnectButton.Custom>

        {authState === "error" && authError && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/20 border border-red-500/50 max-w-xs">
              <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
              <span className="text-xs text-red-400 flex-1">{authError}</span>
              <button
                  onClick={retry}
                  className="text-xs text-red-300 underline hover:text-red-200 whitespace-nowrap"
              >
                Retry
              </button>
            </div>
        )}
      </div>
  );
};