'use client';

import { useState } from "react";
import { Wallet, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const ConnectButtonWallet = ({ onConnect }: { onConnect?: (address: string) => void }) => {
    const { authState, authError, isAuthenticating, retry, authenticate } = useAuth();

    const [address, setAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    const connectLeap = async () => {
        const anyWindow = window as any;
        if (!anyWindow.leap) {
            setConnectionError("Leap Wallet не установлен. Пожалуйста, установите расширение Leap Wallet.");
            return;
        }

        try {
            setIsConnecting(true);
            setConnectionError(null);

            const gonkaChainInfo = {
                chainId: "gonka-mainnet",
                chainName: "Gonka Mainnet",
                rpc: "https://node2.gonka.ai:26657",
                rest: "https://node2.gonka.ai:8443/chain-api",
                bip44: {
                    coinType: 118,
                },
                bech32Config: {
                    bech32PrefixAccAddr: "gonka",
                    bech32PrefixAccPub: "gonkapub",
                    bech32PrefixValAddr: "gonkavaloper",
                    bech32PrefixValPub: "gonkavaloperpub",
                    bech32PrefixConsAddr: "gonkavalcons",
                    bech32PrefixConsPub: "gonkavalconspub",
                },
                currencies: [
                    {
                        coinDenom: "GNK",
                        coinMinimalDenom: "ngonka",
                        coinDecimals: 6,
                    },
                ],
                feeCurrencies: [
                    {
                        coinDenom: "GNK",
                        coinMinimalDenom: "ngonka",
                        coinDecimals: 6,
                    },
                ],
                stakeCurrency: {
                    coinDenom: "GNK",
                    coinMinimalDenom: "ngonka",
                    coinDecimals: 6,
                },
                coinType: 118,
                gasPriceStep: {
                    low: 0.01,
                    average: 0.025,
                    high: 0.04,
                },
            };

            try {
                await anyWindow.leap.enable("gonka-mainnet");
            } catch (enableError: any) {
                if (enableError?.message?.includes("not found") || 
                    enableError?.message?.includes("not available") ||
                    enableError?.code === 4902 ||
                    enableError?.message?.includes("chain") ||
                    enableError?.message?.includes("Chain")) {

                    let chainAdded = false;

                    if (anyWindow.leap.suggestChain) {
                        try {
                            await anyWindow.leap.suggestChain(gonkaChainInfo);
                            chainAdded = true;
                        } catch (suggestError: any) {
                            console.warn("suggestChain failed:", suggestError);
                        }
                    }

                    if (!chainAdded && anyWindow.leap.experimentalSuggestChain) {
                        try {
                            await anyWindow.leap.experimentalSuggestChain(gonkaChainInfo);
                            chainAdded = true;
                        } catch (expError: any) {
                            console.warn("experimentalSuggestChain failed:", expError);
                        }
                    }

                    if (!chainAdded && anyWindow.leap.request) {
                        try {
                            await anyWindow.leap.request({
                                method: "suggestChain",
                                params: gonkaChainInfo,
                            });
                            chainAdded = true;
                        } catch (requestError: any) {
                            console.warn("request suggestChain failed:", requestError);
                        }
                    }
                    
                    if (chainAdded) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await anyWindow.leap.enable("gonka-mainnet");
                    } else {

                        throw new Error(
                            "Сеть gonka-mainnet не найдена в вашем кошельке. " +
                            "Пожалуйста, добавьте сеть вручную в настройках Leap Wallet:\n\n" +
                            "1. Откройте настройки Leap Wallet\n" +
                            "2. Перейдите в раздел 'Сети' или 'Networks'\n" +
                            "3. Добавьте новую сеть со следующими параметрами:\n" +
                            `   - Chain ID: ${gonkaChainInfo.chainId}\n` +
                            `   - RPC: ${gonkaChainInfo.rpc}\n` +
                            `   - REST: ${gonkaChainInfo.rest}\n\n` +
                            "Или обновите Leap Wallet до последней версии для автоматического добавления сети."
                        );
                    }
                } else {
                    throw enableError;
                }
            }

            const offlineSigner = anyWindow.leap.getOfflineSigner("gonka-mainnet");
            const accounts = await offlineSigner.getAccounts();
            
            if (!accounts || accounts.length === 0) {
                setConnectionError("Не найдено аккаунтов в кошельке. Пожалуйста, создайте или импортируйте аккаунт.");
                return;
            }

            const userAddress = accounts[0].address;
            setAddress(userAddress);

            await authenticate(userAddress);

            onConnect?.(userAddress);
        } catch (err: any) {
            console.error("Leap connect error:", err);

            let errorMessage = "Ошибка подключения кошелька";
            
            if (err?.message) {
                if (err.message.includes("rejected") || err.message.includes("User rejected")) {
                    errorMessage = "Подключение отклонено пользователем";
                } else if (err.message.includes("not found") || err.message.includes("not available")) {
                    errorMessage = "Сеть gonka-mainnet не найдена. Добавьте сеть в настройках кошелька.";
                } else {
                    errorMessage = err.message;
                }
            }
            
            setConnectionError(errorMessage);
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
                    ? "Авторизация..."
                    : isConnecting
                        ? "Подключение..."
                        : address
                            ? `${address.slice(0, 6)}...${address.slice(-4)}`
                            : "Подключить Leap Wallet"}
            </button>

            {connectionError && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-900/20 border border-red-500/50 max-w-md">
                    <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 flex flex-col gap-1">
                        <span className="text-xs text-red-400 whitespace-pre-line">{connectionError}</span>
                        <button
                            onClick={() => setConnectionError(null)}
                            className="text-xs text-red-300 underline hover:text-red-200 self-start"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}

            {authState === "error" && authError && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/20 border border-red-500/50 max-w-xs">
                    <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                    <span className="text-xs text-red-400 flex-1">{authError}</span>
                    <button
                        onClick={() => address && authenticate(address)}
                        className="text-xs text-red-300 underline hover:text-red-200 whitespace-nowrap"
                    >
                        Повторить
                    </button>
                </div>
            )}
        </div>
    );
};
