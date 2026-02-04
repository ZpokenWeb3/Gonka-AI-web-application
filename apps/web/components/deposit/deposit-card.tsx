'use client'

import { useGonka } from "../../providers/gonka-provider";
import { useGonkaPrice } from "../../hooks/useGonkaPrice";

export const DepositCard = () => {
    const { balance } = useGonka();
    const { priceUsd } = useGonkaPrice();

    const usdValue = balance * priceUsd;

    return (
        <div className="relative flex flex-col gap-12 w-full h-[350px] p-8 border border-[#232330] rounded-xl overflow-hidden">
            <div className="
                absolute right-0 top-0 h-full w-[45%]
                bg-gradient-to-l from-[#6B26D9]/15 to-transparent
                pointer-events-none
            " />

            <h5 className="text-lg text-[#c9c9c9]">Available Balance</h5>

            <div className="flex flex-col">
                <h3 className="text-[40px] font-semibold text-white">
                    {balance.toFixed(2)} <span className="text-xl text-[#c9c9c9]">GNK</span>
                </h3>
                <h6 className="text-xl text-[#c9c9c9]">
                    ≈ ${usdValue.toFixed(2)} USD
                </h6>
            </div>

            <div className="flex items-center justify-between h-full py-5 px-[50px] z-2  w-full border-t border-[#232330]">
                <div className="flex flex-col items-center">
                    <h5 className="text-2xl font-semibold text-white">{balance.toFixed(2)}</h5>
                    <p className="text-sm text-[#c9c9c9]">Available</p>
                </div>
                <div className="flex flex-col z-2  items-center ">
                    <h5 className="text-2xl font-semibold text-white">0.00</h5>
                    <p className="text-sm text-[#c9c9c9]">Locked</p>
                </div>
                <div className="flex flex-col z-2 items-center ">
                    <h5 className="text-2xl font-semibold text-white">0.00</h5>
                    <p className="text-sm text-[#c9c9c9]">Spent(30d)</p>
                </div>
            </div>
        </div>
    )
}
