import { useEffect, useState } from "react";

export function useGonkaBalance(address?: string | null) {
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!address) {
                setBalance(0);
                return;
            }

            try {
                const res = await fetch(
                    `https://node2.gonka.ai:8443/chain-api/cosmos/bank/v1beta1/balances/${address}`
                );
                const data = await res.json();
                const gnkBalance = data.balances?.find(
                    (b: any) => b.denom === "ngonka"
                );
                setBalance(gnkBalance ? Number(gnkBalance.amount) / 1e6 : 0);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBalance();
    }, [address]);

    return {balance};
}