'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GonkaContextType {
    address: string | null;
    setAddress: (addr: string | null) => void;
    balance: number;
}

const GonkaContext = createContext<GonkaContextType>({
    address: null,
    setAddress: () => {},
    balance: 0,
});

export const GonkaProvider = ({ children }: { children: ReactNode }) => {
    const [address, setAddress] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        try {
            return localStorage.getItem("gonka_address");
        } catch {
            return null;
        }
    });
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            if (address) {
                localStorage.setItem("gonka_address", address);
            } else {
                localStorage.removeItem("gonka_address");
            }
        } catch {
            // ignore localStorage errors
        }
    }, [address]);

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
                const gnkBalance = data.balances?.find((b: any) => b.denom === "ngonka");
                setBalance(gnkBalance ? Number(gnkBalance.amount) / 1e6 : 0);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBalance();
    }, [address]);

    return (
        <GonkaContext.Provider value={{ address, setAddress, balance }}>
            {children}
        </GonkaContext.Provider>
    );
};

export const useGonka = () => useContext(GonkaContext);
