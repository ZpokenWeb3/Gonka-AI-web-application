'use client'

import { BanknoteArrowDown, ChartNoAxesCombined, Shuffle } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "../ui/modal";
import { TopUpForm } from "./top-up-form";

export const DepositBtns = () => {
    const [isOpen, setOpen] = useState<boolean>(false)
    return (
        <div className="flex items-center gap-4 ">
            <Button onClick={() => setOpen(true)} className="h-[40px] flex-1" variant="secondary">
                + Add funds
            </Button>
            <Link className="flex-1" href="/bridge">
                <Button className="h-[40px] flex-1" variant="outline">
                    <Shuffle color="#c9c9c9"/>
                    Bridge
                </Button>
            </Link>
            <Link className="flex-1" href="/withdraw">
                <Button className="h-[40px] flex-1" variant="outline">
                    <BanknoteArrowDown color="#c9c9c9"/>
                    Withdraw
                </Button>
            </Link>
            <Link className="flex-1" href="/analytics">
                <Button className="h-[40px]" variant="outline">
                    <ChartNoAxesCombined color="#c9c9c9"/>
                    Analytics
                </Button>
            </Link>

            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setOpen(false)} form={ <TopUpForm/> }/>
            )}
        </div>
    )
}