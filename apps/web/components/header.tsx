'use client'

import {ConnectButtonWallet} from "./ui/connect-button-wallet";
import {Button} from "./ui/button";
import {Plus, Search, Settings, Wallet} from "lucide-react";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { erc20Abi, formatUnits } from "viem";


export const Header = () => {
    const { address, isConnected } = useAccount();

    const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: "0xA86EFf7284e059A06C7F8D0346Ac5570C72BeEa5",
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  })

  const formattedBalance = balance
    ? Number(formatUnits(balance, 18)).toFixed(2)
    : '0.00'

    return (
        <div className="flex items-center justify-between w-full border-b border-[#232330] p-4">
            <div
                className="flex items-center justify-center h-[36px] gap-2 px-2 text-sm text-[#c9c9c9] font-medium cursor-pointer w-[250px] bg-[#131316] transition-all duration-300 border border-[#232328] rounded-[8px]">
                <Search width={15} height={15}/>
                <input
                    placeholder="Search "
                    className="w-full text-sm text-white outline-none bg-transparent"
                />
            </div>
            <div className="flex gap-2">
                <Link href="/deposit">
                    <Button className="w-fit h-10" variant="outline">
                        <Wallet width={30} height={30}/>
                        Balance: ${formattedBalance} GNK
                        <div className="flex items-center justify-center bg-[#c9c9c9] w-4 h-4 text-lg text-[#131316] rounded-full">
                            +
                        </div>
                    </Button>
                </Link>
                <ConnectButtonWallet/>
                <Link href="/settings">
                    <Button className="w-10 h-10" variant="outline">
                        <Settings width={30} height={30}/>
                    </Button>
                </Link>
            </div>
        </div>
    )
}