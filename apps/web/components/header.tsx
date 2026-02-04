'use client';

import { Button } from "./ui/button";
import { Wallet, Search, Settings } from "lucide-react";
import Link from "next/link";
import { ConnectButtonWallet } from "./ui/connect-button-wallet";
import {useGonka} from "../providers/gonka-provider";


export const Header = () => {
    const { address, setAddress, balance } = useGonka();

    const formattedBalance = balance.toFixed(2);

    return (
        <div className="flex items-center justify-between w-full border-b border-[#232330] p-4">
            <div className="flex items-center justify-center h-[36px] gap-2 px-2 text-sm text-[#c9c9c9] font-medium cursor-pointer w-[250px] bg-[#131316] transition-all duration-300 border border-[#232328] rounded-[8px]">
                <Search width={15} height={15} />
                <input
                    placeholder="Search"
                    className="w-full text-sm text-white outline-none bg-transparent"
                />
            </div>

            <div className="flex gap-2 items-center">
                {address ? (
                    <Link href="/deposit">
                        <Button className="w-fit h-10" variant="outline">
                            <Wallet width={30} height={30} />
                            Balance: {formattedBalance} GNK
                            <div className="flex items-center justify-center bg-[#c9c9c9] w-4 h-4 text-lg text-[#131316] rounded-full">
                                +
                            </div>
                        </Button>
                    </Link>
                ) : (
                    <ConnectButtonWallet onConnect={setAddress} />
                )}

                <Link href="/settings">
                    <Button className="w-10 h-10" variant="outline">
                        <Settings width={30} height={30} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};
